'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auth_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'persons_persons',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex('auth_users', ['person_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('auth_users');
  },
};
