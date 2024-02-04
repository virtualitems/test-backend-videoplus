/**
 * @fileoverview Auth app services.
 */


// first-party dependencies
const { User } = require('./models');
const jsonwebtoken = require('../shared/jsonwebtoken');


// services

async function find(where) {
  const user = await User.findOne({where});
  return user;
}


async function create(data) {
  const user = await User.create({
    person_id: data.person_id,
    email: data.email,
    password: data.password,
  });
  return user;
}


async function update(model, data) {

  if (data.password) {
    model.setDataValue('password', data.password);
  }

  if (data.email) {
    model.setDataValue('email', data.email);
  }

  const user = await model.save();

  return user;
}


async function sessionStart(usr, per, data) {
  const token = jsonwebtoken.generateAccessToken(usr, per, data);
  return token;
}


module.exports = {
  create,
  find,
  update,
  sessionStart,
};
