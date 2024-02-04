/**
 * @fileoverview
 * @requires seequelize
 * @requires path
 */

// third-party dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');

// first-party dependencies
const sequelizeConfig = require('../../config/config.json');

// constants
const sequelize = new Sequelize(sequelizeConfig.development);

/**
 * @exports
 */
module.exports = {
  sequelize,
  Model,
  DataTypes
};