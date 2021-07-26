'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Payment.belongsTo(models.Users, {foreign_key: 'UserId', onDelete: 'CASCADE'});
     Payment.belongsTo(models.Configuration, {foreignKey: 'ConfigurationId',  onDelete: 'CASCADE'});
    }
  };
  Payment.init({
    creditAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};