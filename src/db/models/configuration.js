'use strict';
const {
  Model
} = require('sequelize');

const PROTECTED_ATTRIBUTES = ['user', 'password', 'apiKey'];
module.exports = (sequelize, DataTypes) => {
  class Configuration extends Model {
    toJSON(){

      const attributes = {...this.get()};

      for(const a of PROTECTED_ATTRIBUTES){
        delete attributes[a];
      }

      return attributes;
    }
    static associate(models) {
      // define association here
     // Users.hasMany(models.Payment, {foreignKey: 'UserId',as: 'payments',onDelete: 'CASCADE'})

      Configuration.hasMany(models.Payment, {foreignKey: 'ConfigurationId',as: 'payments',onDelete: 'CASCADE'});
     // Configuration.hasMany(models.User, {foreignKey: 'ConfigurationId',as: 'users'});
    }
  };
  Configuration.init({
    name: DataTypes.STRING,
    user: DataTypes.STRING,
    password: DataTypes.STRING,
    apiKey: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.STRING,
    company: DataTypes.STRING,
    amountLeft: DataTypes.FLOAT,
    creditBalance: DataTypes.INTEGER,
    creditsToDispense: DataTypes.INTEGER,
    rate: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Configuration',
  });

  return Configuration;
};