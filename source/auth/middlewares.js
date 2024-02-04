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

  try {
    const user = await jsonwebtoken.verifyAccessToken(token);

    if (!user) {
      res.status(401).end();
      return;
    }

    req.authenticated = user;
    next();

  } catch (error) {
    if (error instanceof jsonwebtoken.JsonWebTokenError) {
      res.status(401).end();
      return;
    } else {
      console.error(error);
    }
  }

}


async function softAuthentication(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    next();
    return;
  }

  try {
    const user = await jsonwebtoken.verifyAccessToken(token);

    if (!user) {
      next();
      return;
    }

    req.authenticated = user;
    next();

  } catch (error) {
    if (error instanceof jsonwebtoken.JsonWebTokenError) {
      next();
      return;
    } else {
      console.error(error);
    }
  }

}


/**
 * @exports
 */
module.exports = {
  authentication,
  softAuthentication,
};