/**
 * @fileoverview Middlewares for the auth context.
 */


// first-party dependencies
const jsonwebtoken = require('../shared/jsonwebtoken');


// middlewares

async function authentication(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).end();
    return;
  }

  const user = await jsonwebtoken.verifyAccessToken(token);

  if (!user) {
    res.status(401).end();
    return;
  }

  req.authenticated = user;
  next();
}


/**
 * @exports
 */
module.exports = {
  authentication
};