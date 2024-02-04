/**
 * @fileoverview Contains the configuration for the multer middleware.
 */


// third-party dependencies
const multer = require('multer');
const path = require('path');

// constants
const tmpPath = path.join(__dirname, '..', '..', 'tmp');
const mediaPath = path.join(__dirname, '..', '..', 'media');


// setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, tmpPath);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const tmpFileName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, tmpFileName);
  },
});

const middleware = multer({ storage });


/**
 * @exports
 */
module.exports = {
  middleware,
  paths: {
    tmp: tmpPath,
    media: mediaPath,
  },
};