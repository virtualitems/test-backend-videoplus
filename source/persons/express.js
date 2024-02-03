/**
 * @fileoverview Express setup for the persons context.
 */


// third-party dependencies
const express = require('express');
const multer = require('../shared/multer');
const path = require('path');


// first-party dependencies
const controllers = require('./controllers');
const urls = require('./urls');


/**
 * @description Installs the persons context into the given express app.
 * @param {express.Application} app
 */
function install(app) {

  // static files
  app.use(urls.media, express.static(path.join(__dirname, '..', '..', 'media', 'persons')));

  // users
  app.get(urls.index, controllers.list);
  app.get(urls.model, controllers.show);
  app.put(urls.model, multer.middleware.single('avatar'), controllers.update);
  app.delete(urls.model, controllers.destroy);

  // register
  app.post(urls.register, multer.middleware.single('avatar'), controllers.create);

}


/**
 * @exports
 */
module.exports = {
  install,
};
