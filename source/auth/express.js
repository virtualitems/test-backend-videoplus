/**
 * @fileoverview Express setup for the auth context.
 */


// third-party dependencies
const multer = require('../shared/multer');
const express = require('express');


// first-party dependencies
const controllers = require('./controllers');
const urls = require('./urls');


/**
 * @description Installs the persons context into the given express app.
 * @param {express.Application} app
 */
function install(app, manager) {

  // sessions
  app.post(urls.login,
    multer.middleware.none(),
    controllers.sessionStart,
  );

}


/**
 * @exports
 */
module.exports = {
  install,
};
