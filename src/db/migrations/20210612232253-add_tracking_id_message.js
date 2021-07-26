'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [ queryInterface.addColumn(
      'Messages',
      'trackingId',
      Sequelize.STRING
     )];
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Messages', 'trackingId')
  }
};
