/**
 * @fileoverview Express setup for the persons context.
 */


// third-party dependencies
const express = require('express');
const multer = require('../shared/multer');
const path = require('path');


// first-party dependencies
const authApp = require('../auth/express');
const authMiddlewares = require('../auth/middlewares');
const controllers = require('./controllers');
const urls = require('./urls');


/**
 * @description Installs the persons context into the given express app.
 * @param {express.Application} app
 */
function install(app, manager) {

  // static files
  app.use(urls.media, express.static(path.join(__dirname, '..', '..', 'media', 'persons')));

  // users
  app.get(urls.index,
    controllers.list
  );

  app.get(urls.model,
    controllers.show
  );

  app.put(urls.model,
    authMiddlewares.authentication,
    multer.middleware.single('avatar'), controllers.update
  );

  app.delete(urls.model,
    authMiddlewares.authentication,
    controllers.destroy
  );

  // register
  app.post(urls.register,
    multer.middleware.single('avatar'),
    controllers.create
  );

  // install additional apps
  manager.install(app, 'auth', authApp.install);
}


/**
 * @exports
 */
module.exports = {
  install,
};
