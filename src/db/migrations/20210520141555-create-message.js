'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key:'id',
       //   as: 'userId'
        }
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      sender: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};