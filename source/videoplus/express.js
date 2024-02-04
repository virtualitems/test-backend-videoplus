/**
 * @fileoverview Express setup for the videoplus context.
 */


// third-party dependencies
const express = require('express');
const multer = require('../shared/multer');
const path = require('path');


// first-party dependencies
const personsApp = require('../persons/express');
const authApp = require('../auth/express');
const authMiddlewares = require('../auth/middlewares');
const controllers = require('./controllers');
const urls = require('./urls');

/**
 * @description Installs the videoplus context into the given express app.
 * @param {express.Application} app
 */
function install(app, manager) {

  // static files
  app.use(urls.media, express.static(path.join(__dirname, '..', '..', 'media', 'videoplus')));

  // videos

  app.get(urls.index,
    authMiddlewares.softAuthentication,
    controllers.list
  );

  app.get(urls.model,
    authMiddlewares.softAuthentication,
    controllers.show
  );

  app.post(urls.index,
    authMiddlewares.authentication,
    multer.middleware.fields([{ name: 'file', maxCount: 1, }, { name: 'thumbnail', maxCount: 1, }]),
    controllers.create
  );

  app.put(urls.model,
    authMiddlewares.authentication,
    multer.middleware.fields([{ name: 'file', maxCount: 1, }, { name: 'thumbnail', maxCount: 1, }]),
    controllers.update
  );

  app.delete(urls.model,
    authMiddlewares.authentication,
    controllers.destroy
  );

  app.put(urls.interactions,
    authMiddlewares.softAuthentication,
    multer.middleware.none(),
    controllers.interactions
  );

  // install additional apps
  manager.install(app, 'persons', personsApp.install);
  manager.install(app, 'auth', authApp.install);
}


/**
 * @exports
 */
module.exports = {
  install,
};
