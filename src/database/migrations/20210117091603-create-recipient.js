'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipients', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      last_message_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      speciality: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      form: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('recipients');
  },
};
