/**
 * @fileoverview Entry point for the application.
 * @requires express
 * @requires path
 */

// third-party dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// first-party dependencies
const videoplusApp = require('./videoplus/express');
const http = require('./shared/http');

// directories setup
fs.mkdirSync(path.join(__dirname, '..', 'media'), { recursive: true });
fs.mkdirSync(path.join(__dirname, '..', 'tmp'), { recursive: true });

// express app setup
const app = express();

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
      installer(app, this);
    };
});

// cors
app.options('*', http.corsMiddleware);
app.use(http.corsMiddleware);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// media files
app.use('/media', express.static(path.join(__dirname, 'media')));

// install additional apps
appsManager.install(app, 'videoplus', videoplusApp.install);

// run server
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
