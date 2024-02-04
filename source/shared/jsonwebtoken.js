/**
 * @fileoverview
 */

// third-party dependencies
const jwt = require('jsonwebtoken');


// constants
const secret = 'mysecret';  // This must be in a .env file in a real-world scenario.
const time = `${60 * 60 * 24 * 7}s`;  // 1 week


function generateAccessToken(usr, extra=null) {
  return jwt.sign({ usr: usr, ...extra }, secret, { expiresIn: time });
}


function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(user);
    });
  });
}


function decodeAccessToken(token) {
  return jwt.decode(token);
}


function refreshToken(token) {
  return jwt.sign(decodeAccessToken(token), secret, { expiresIn: time });
}


/**
 * @exports
 */
module.exports = {
  generateAccessToken,
  verifyAccessToken,
  decodeAccessToken,
  refreshToken,
};
