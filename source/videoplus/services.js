/**
 * @fileoverview Videoplus app services.
 */


// first-party dependencies
const { Video } = require('./models');
const { Person } = require('../persons/models');
const { MongoManager } = require('../shared/mongoose');


// services

async function list(where=null, order=null, limit=null) {
  const models = await Video.findAll({where, order, limit});
  return models;
}


async function find(where) {
  const model = await Video.findOne({ where });
  return model;
}


async function create(author, data) {

  const person = await Person.findOne({ where: { slug: author } });

  if (person === null) {
    throw new Error('Author not found');
  }

  const model = await Video.create({
    slug: data.slug,
    title: data.title,
    file: data.file,
    thumbnail: data.thumbnail,
    author_id: person.id,
    isPublic: data.isPublic,
    isActive: data.isActive,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });

  return model;
}


async function update(model, data) {

  const slug = data?.slug;
  const title = data?.title;
  const ispublic = data?.ispublic;
  const isactive = data?.isactive;
  const file = data?.file;
  const thumbnail = data?.thumbnail;

  if (title && slug) {
    model.setDataValue('title', title);
    model.setDataValue('slug', slug);
  }

  if (isactive) {
    if (isactive === 'true') {
      model.setDataValue('isActive', true);
    } else {
      model.setDataValue('isActive', false);
    }
  }

  if (ispublic) {
    if (ispublic === 'true') {
      model.setDataValue('isPublic', true);
    } else {
      model.setDataValue('isPublic', false);
    }
  }

  if (file) {
    model.setDataValue('file', file);
  }

  if (thumbnail) {
    model.setDataValue('thumbnail', thumbnail);
  }

  await model.save();
}


async function destroy(model) {
  model.setDataValue('isActive', false);
  await model.save();
}


async function interactions(person, video, data) {
  const manager = new MongoManager();
  manager.saveInteraction(person, video, data);
}


/**
 * @exports
 */
module.exports = {
  list,
  find,
  create,
  update,
  destroy,
  interactions,
};
