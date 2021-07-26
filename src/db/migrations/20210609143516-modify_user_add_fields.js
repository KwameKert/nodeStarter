'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [ queryInterface.addColumn(
      'Users',
      'ConfigurationId',
       {
        type: Sequelize.INTEGER,
        references: {
          model: 'Configurations',
          key:'id'
        }
       }
     )];
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'ConfigurationId'),
    ]);
  }
};
