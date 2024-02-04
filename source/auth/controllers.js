/**
 * @fileoverview Auth app controllers (MVC).
 */

// third-party dependencies


// first-party dependencies
const services = require('./services');


// POST /auth/login
async function sessionStart(req, res) {
  const { email, password } = req.body;

  const user = await services.find({ email, password });

  if (user === null) {
    res.status(401).end();
    return;
  }

  const person = await user.getPerson();

  const token = await services.sessionStart(user.email, person.slug);

  res.send({ token });
}


/**
 * @exports
 */
module.exports = {
  sessionStart,
};
