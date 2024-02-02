/**
 * @fileoverview Entry point for the application.
 * @requires express
 * @requires path
 */

// third-party dependencies
const express = require('express');
const path = require('path');

// first-party dependencies

// express app setup
const app = express();
const port = 3000;

// static files
app.use(express.static(path.join(__dirname, 'public')));

// media files
app.use('/media', express.static(path.join(__dirname, 'media')));

// run server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});