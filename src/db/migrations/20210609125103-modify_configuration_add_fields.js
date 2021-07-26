'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [ queryInterface.addColumn(
      'Configurations',
      'url',
       Sequelize.STRING
     )];
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Configurations', 'url'),
    ]);
  }
};
