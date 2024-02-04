/**
 * @fileoverview Videoplus app controllers (MVC).
 */

// third-party dependencies
const { UniqueConstraintError } = require('sequelize');
const multer = require('../shared/multer');
const fs = require('fs');
const path = require('path');


// first-party dependencies
const services = require('./services');


// GET /videos
async function list(req, res) {

  const ispublic = req.query?.ispublic;
  const isactive = req.query?.isactive;

  const where = {};

  if (ispublic) {
    where.isPublic = ispublic === 'true';
  }

  if (isactive) {
    where.isActive = isactive === 'true';
  }

  const videos = await services.list(where);
  res.send(videos || []);
}


// GET /videos/:slug
async function show(req, res) {
  const slug = req.params.slug;
  const video = await services.find({ slug });
  const author = await video.getAuthor();

  video.setDataValue('author', author);

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
  const videoFile = req.file;

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

  const videoFile = req.file;

  const mediaPath = multer.paths.media;
  const oldFilePath = videoFile.path;
  const newFilePath = path.join(mediaPath, 'videoplus', videoFile.filename);

  try {

    fs.mkdirSync(path.join(mediaPath, 'videoplus'), { recursive: true });

    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        throw err;
      }
    });

    await services.create(author, {
      slug: slug,
      title: title,
      file: `/media/videoplus/${videoFile.filename}`,
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
