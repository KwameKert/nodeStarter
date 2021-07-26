'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [ queryInterface.addColumn(
      'Configurations',
      'creditsToDispense',
      Sequelize.STRING
     )];
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Configurations', 'creditsToDispense'),
    ]);
  }
};
