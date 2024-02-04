/**
 * @fileoverview Videoplus app controllers (MVC).
 */

// third-party dependencies
const { UniqueConstraintError } = require('sequelize');
const fs = require('fs');
const path = require('path');


// first-party dependencies
const services = require('./services');
const { Person } = require('../persons/models');
const multer = require('../shared/multer');
const { MongoManager } = require('../shared/mongoose');


// GET /videos
async function list(req, res) {

  const ispublic = req.query?.ispublic;
  const isactive = req.query?.isactive;
  const author = req.query?.author;

  const where = {};

  if (ispublic) {
    where.isPublic = ispublic === 'true';
  }

  if (isactive) {
    where.isActive = isactive === 'true';
  }

  if (author) {
    const person = await Person.findOne({ where: { slug: author } });
    where.author_id = person.id;
  }

  const videos = await services.list(where);
  res.send(videos || []);
}


// GET /videos/:slug
async function show(req, res) {
  const slug = req.params.slug;
  const video = await services.find({ slug });

  if (video === null || !video.isActive) {
    res.status(404).end();
    return;
  }

  const author = await video.getAuthor();

  const mongo = new MongoManager();
  const rawInteractions = await mongo.getInteractions({video: video.id});

  const interactions = {
    likes: 0,
    comments: []
  };

  for (const interaction of rawInteractions) {
    if (interaction.like) {
      interactions.likes++;
    }

    if (typeof interaction.comment === 'string') {
      interactions.comments.push({
        person: await Person.findOne({ where: { id: interaction.person }, attributes: ['name', 'slug', 'avatar'] }),
        content: interaction.comment,
      });
    }
  };


  video.setDataValue('author', author);
  video.setDataValue('interactions', interactions);

  if (video === null || !video.isActive) {
    res.status(404).end();
    return;
  }

  res.send(video);
}


// PUT /videos/:slug
async function update(req, res) {

  const slug = req.params.slug;
  const video = await services.find({ slug });

  const isactive = req.body?.isactive;

  const videoFile = (
    req.files?.file &&
    req.files.file.length > 0 &&
    req.files.file[0]
  );

  const thumbnailFile = (
    req.files?.thumbnail &&
    req.files.thumbnail.length > 0 &&
    req.files.thumbnail[0]
  );

  if (video === null) {
    res.status(404).end();
    return;
  }

  if (video.isActive === false && isactive !== 'true') {
    res.status(404).end();
    return;
  }

  const updateData = { ...req.body };

  if (videoFile) {
    const mediaPath = multer.paths.media;
    const oldFilePath = videoFile.path;
    const newFilePath = path.join(mediaPath, 'videoplus', videoFile.filename);

    fs.mkdirSync(path.join(mediaPath, 'videoplus'), { recursive: true });

    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        throw err;
      }
    });

    updateData.file = `/media/videoplus/${videoFile.filename}`;
  }

  if (thumbnailFile) {
    const mediaPath = multer.paths.media;
    const oldThumbnailPath = thumbnailFile.path;
    const newThumbnailPath = path.join(mediaPath, 'videoplus', thumbnailFile.filename);

    fs.mkdirSync(path.join(mediaPath, 'videoplus'), { recursive: true });

    fs.rename(oldThumbnailPath, newThumbnailPath, (err) => {
      if (err) {
        throw err;
      }
    });

    updateData.thumbnail = `/media/videoplus/${thumbnailFile.filename}`;
  }

  try {
    await services.update(video, updateData);
    res.status(204).end();

  } catch (error) {
    console.error(error);
    if (error instanceof UniqueConstraintError) {
      res.status(409).send('Video already exists');
    } else {
      res.status(500).send('Internal server error');
    }
  }

}


// DELETE /videos/:slug
async function destroy(req, res) {
  const slug = req.params.slug;

  const video = await services.find({ slug });

  if (video === null) {
    res.status(404).end();
    return;
  }

  try {
    video.isActive = false;
    await video.save();
    res.status(204).end();

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }

}


// POST /videos
async function create(req, res) {

  const {
    slug,
    title,
    ispublic,
    author
  } = req.body;

  if (!req.files?.file || req.files.file.length === 0 ||
      !req.files?.thumbnail || req.files.thumbnail.length === 0) {
    res.status(400).send('Some data are missing');
    return;
  }


  const videoFile = req.files.file[0];
  const thumbnailFile = req.files.thumbnail[0];

  const mediaPath = multer.paths.media;

  const oldFilePath = videoFile.path;
  const newFilePath = path.join(mediaPath, 'videoplus', videoFile.filename);

  const oldThumbnailPath = thumbnailFile.path;
  const newThumbnailPath = path.join(mediaPath, 'videoplus', thumbnailFile.filename);

  try {

    fs.mkdirSync(path.join(mediaPath, 'videoplus'), { recursive: true });

    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        throw err;
      }
    });

    fs.rename(oldThumbnailPath, newThumbnailPath, (err) => {
      if (err) {
        throw err;
      }
    });

    await services.create(author, {
      slug: slug,
      title: title,
      file: `/media/videoplus/${videoFile.filename}`,
      thumbnail: `/media/videoplus/${thumbnailFile.filename}`,
      isPublic: ispublic === 'true',
    });

    res.status(201).end();

  } catch (error) {
    console.error(error);
    if (error instanceof UniqueConstraintError) {
      res.status(409).send('Person already exists');
    } else {
      res.status(500).send('Internal server error');
    }
  }

}


// PUT /videos/:slug/interactions
async function interactions(req, res) {
  const slug = req.params.slug;
  const like = req.body?.like;
  const comment = req.body?.comment;

  if (like === undefined && comment === undefined) {
    res.status(400).send('Some data are missing');
    return;
  }

  const video = await services.find({ slug });

  if (video === null) {
    res.status(404).end();
    return;
  }

  let person = null;

  if (req.authenticated) {
    person = await Person.findOne({ where: { slug: req.authenticated.per } });

    if (person === null) {
      res.status(401).end();
      return;
    }
  }

  services.interactions(person, video, { like, comment });

  res.end();
}


/**
 * @exports
 */
module.exports = {
  list,
  show,
  update,
  destroy,
  create,
  interactions,
};
