/**
 * @fileoverview Express setup for the videoplus context.
 */


// third-party dependencies
const express = require('express');
const multer = require('../shared/multer');
const path = require('path');


// first-party dependencies
const controllers = require('./controllers');
const urls = require('./urls');


/**
 * @description Installs the videoplus context into the given express app.
 * @param {express.Application} app
 */
function install(app) {

  // static files
  app.use(urls.media, express.static(path.join(__dirname, '..', '..', 'media', 'videoplus')));

  // videos
  app.get(urls.index, controllers.list);
  app.get(urls.model, controllers.show);
  app.post(urls.index, multer.middleware.single('file'), controllers.create);
  app.put(urls.model, multer.middleware.single('file'), controllers.update);
  app.delete(urls.model, controllers.destroy);
  app.put(urls.likes, controllers.interactions);
}


/**
 * @exports
 */
module.exports = {
  install,
};
