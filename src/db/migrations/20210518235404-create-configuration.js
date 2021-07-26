'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Configurations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      apiKey: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      amountLeft: {
        type: Sequelize.FLOAT
      },
      creditBalance: {
        type: Sequelize.INTEGER
      },
      rate: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Configurations');
  }
};