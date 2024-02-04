// first-party dependencies
const { sequelize, DataTypes } = require('../../shared/sequelize');
const { Person } = require('../../persons/models');


const Video = sequelize.define('Video', {
  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  file: {
    type: DataTypes.STRING(300),
    allowNull: false,
    unique: true
  },
  thumbnail: {
    type: DataTypes.STRING(300),
    allowNull: false,
    unique: true
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_public'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_active'
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
  tableName: 'videos_videos',
});

Video.belongsTo(Person, {
  foreignKey: 'author_id',
  as: 'author'
});


/**
 * @exports
 */
module.exports = Video;
