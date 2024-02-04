/**
 * @fileoverview Persons app controllers (MVC).
 */

// third-party dependencies
const { UniqueConstraintError } = require('sequelize');
const multer = require('../shared/multer');
const fs = require('fs');
const path = require('path');


// first-party dependencies
const services = require('./services');


// GET /users
async function list(req, res) {
  const persons = await services.list();
  res.send(persons || []);
}


// GET /users/:slug
async function show(req, res) {
  const slug = req.params.slug;
  const person = await services.find({ slug });

  if (person === null || !person.isActive) {
    res.status(404).end();
    return;
  }

  res.send(person);
}


// PUT /users/:slug
async function update(req, res) {
  const slug = req.params.slug;
  const person = await services.find({ slug });

  const isactive = req.body?.isactive;
  const avatarFile = req.file;

  if (person === null) {
    res.status(404).end();
    return;
  }

  if (person.isActive === false && isactive !== 'true') {
    res.status(404).end();
    return;
  }

  const updateData = { ...req.body };

  if (avatarFile) {
    const mediaPath = multer.paths.media;
    const oldAvatarPath = avatarFile.path;
    const newAvatarPath = path.join(mediaPath, 'persons', avatarFile.filename);

    fs.mkdirSync(path.join(mediaPath, 'persons'), { recursive: true });

    fs.rename(oldAvatarPath, newAvatarPath, (err) => {
      if (err) {
        throw err;
      }
    });

    updateData.avatar = `/media/persons/${avatarFile.filename}`;
  }

  try {
    await services.update(person, updateData);
    res.status(204).end();

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');

  }

}


// DELETE /users/:slug
async function destroy(req, res) {
  const slug = req.params.slug;

  const person = await services.find({ slug });

  if (person === null) {
    res.status(404).end();
    return;
  }

  try {
    person.isActive = false;
    await person.save();
    res.status(204).end();

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }

}


// POST /users
async function create(req, res) {

  const {slug, name, birthdate} = req.body;
  const avatarFile = req.file;

  const birthDate = new Date(birthdate);

  const mediaPath = multer.paths.media;
  const oldAvatarPath = avatarFile.path;
  const newAvatarPath = path.join(mediaPath, 'persons', avatarFile.filename);

  if (!slug || !name || !birthdate || !avatarFile) {
    res.status(400).send('Some required fields are missing');
    return;
  }

  if (isNaN(birthDate.getTime())) {
    res.status(400).send('Invalid birthdate');
    return;
  }

  try {

    fs.mkdirSync(path.join(mediaPath, 'persons'), { recursive: true });

    fs.rename(oldAvatarPath, newAvatarPath, (err) => {
      if (err) {
        throw err;
      }
    });

    await services.create({
      slug: slug,
      name: name,
      birthdate: birthDate,
      avatar: `/media/persons/${avatarFile.filename}`,
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


/**
 * @exports
 */
module.exports = {
  list,
  show,
  update,
  destroy,
  create,
};
