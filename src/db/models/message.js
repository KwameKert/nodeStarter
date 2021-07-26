'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // define association here
      Message.belongsTo(models.Users, {foreign_key: 'UserId', onDelete: 'CASCADE'});
    }
  };
  Message.init({
    UserId: DataTypes.INTEGER,
    sender: DataTypes.STRING,
    status: DataTypes.STRING,
    text: DataTypes.STRING,
    destination: DataTypes.STRING,
    trackingId: DataTypes.STRING,
    subject: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Message',
  });
  return Message;
};