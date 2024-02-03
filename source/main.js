/**
 * @fileoverview Entry point for the application.
 * @requires express
 * @requires path
 */

// third-party dependencies
const express = require('express');
const path = require('path');

// first-party dependencies
const personsApp = require('./persons/express');
const videoplusApp = require('./videoplus/express');

// express app setup
const app = express();
const port = 3000;
const appsManager = new (function() {
    const installedApps = [];

    this.has = function(name) {
      return installedApps.includes(name);
    };

    this.install = function(app, name, installer) {

      if (this.has(name)) {
        return;
      }

      installedApps.push(name);
      installer(app)
    };
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

// media files
app.use('/media', express.static(path.join(__dirname, 'media')));

// install additional apps
appsManager.install(app, 'persons', personsApp.install);
appsManager.install(app, 'videoplus', videoplusApp.install);

// run server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
