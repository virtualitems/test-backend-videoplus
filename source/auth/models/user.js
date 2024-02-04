// first-party dependencies
const { sequelize, DataTypes } = require('../../shared/sequelize');
const { Person } = require('../../persons/models');


const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: 'auth_users',
});

User.belongsTo(Person, {
  foreignKey: 'person_id',
  as: 'person'
});


/**
 * @exports
 */
module.exports = User;
