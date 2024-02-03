// first-party dependencies
const { sequelize, DataTypes } = require('../../shared/sequelize');

/**
 * @exports
 */
module.exports = sequelize.define('Person', {
  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATE
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_active'
  },
  avatar: {
    type: DataTypes.STRING(300)
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
  tableName: 'persons_persons',
});
