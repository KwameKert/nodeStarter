'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sender.belongsTo(models.Users, {foreignKey: 'UserId',  onDelete: 'CASCADE'});
    }
  };
  Sender.init({
    status: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Sender',
  });
  return Sender;
};