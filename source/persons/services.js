/**
 * @fileoverview Persons app services.
 */


// first-party dependencies
const { Person } = require('./models');


// services

async function list(where, order, limit) {
  const models = await Person.findAll();
  return models;
}


async function find(where) {
  const model = Person.findOne({ where });
  return model;
}


async function create(data) {

  const model = await Person.create({
    slug: data.slug,
    name: data.name,
    birthdate: data.birthdate,
    is_active: data.is_active,
    avatar: data.avatar,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });

  return model;
}


async function update(model, data) {

  const name = data?.name;
  const birthdate = data?.birthdate;
  const isactive = data?.isactive;
  const avatar = data.avatar;

  if (data?.name) {
    model.name = name;
    model.slug = name.toLowerCase().replace(/\s/g, '-');
  }

  if (birthdate) {

    const birthDate = new Date(birthdate);

    if (isNaN(birthDate.getTime())) {
      res.status(400).send('Invalid birthdate');
      return;
    }

    model.birthdate = birthDate;
  }

  if (isactive === 'true') {
    model.isActive = true;
  }

  if (avatar) {
    model.avatar = avatar;
  }

  await model.save();
}


async function destroy(model) {
  model.isActive = false;
  await model.save();
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
  // profile,
  // profileEdit,
  // profileUpdate,
  // register,
  // registerCreate,
  // relatedVideos,
};
