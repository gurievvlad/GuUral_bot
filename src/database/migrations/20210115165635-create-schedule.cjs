'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedule', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
      },
      date: {
        type: Sequelize.DataTypes.DATE,
      },
      time_from: {
        type: Sequelize.DataTypes.TIME,
      },
      time_to: {
        type: Sequelize.DataTypes.TIME,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
      },
      teacher: {
        type: Sequelize.DataTypes.STRING,
      },
      group: {
        type: Sequelize.DataTypes.STRING,
      },
      course: {
        type: Sequelize.DataTypes.STRING,
      },
      speciality: {
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('schedule');
  },
};
