
import {
  Model
}  from 'sequelize';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';

const PROTECTED_ATTRIBUTES = ['password'];

module.exports =   (sequelize, DataTypes) => {
  class Users extends Model {
    toJSON(){

      const attributes = {...this.get()};

      for(const a of PROTECTED_ATTRIBUTES){
        delete attributes[a];
      }

      return attributes;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Payment, {foreignKey: 'UserId',as: 'payments',onDelete: 'CASCADE'})
      Users.hasMany(models.Sender, {foreignKey: 'UserId',as: 'senders',onDelete: 'CASCADE'})
      Users.hasMany(models.Message, {foreignKey: 'UserId',as: 'messages',onDelete: 'CASCADE'})
      Users.belongsTo(models.Configuration, {foreignKey: 'ConfigurationId'});
    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    apiKey: DataTypes.STRING,
    status: DataTypes.STRING,
    email: DataTypes.STRING,
    lastLoginAt: DataTypes.DATE,
    lastKeyAt: DataTypes.DATE,
    creditBalance: {type: DataTypes.INTEGER, defaultValue: 0}
  }, {
   // paranoid: true,
    sequelize,
    modelName: 'Users',
  });


  Users.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = user._hashPassword(user.password);
    }
  });
  
  Users.prototype._createToken = function createToken() {
    return jwt.sign({
      id: this.id,
    }, constants.JWT_SECRET, {
      expiresIn: '8h',
    });
  };

  Users.prototype._hashPassword = function _hashPassword(password) {
    return hashSync(password);
  };
  
  Users.prototype.authenticate = function authenticate(password) {
    return compareSync(password, this.password);
  };
  
  
  Users.prototype.auth = function auth() {
    return {
      ...this.get({ plain: true }),
      password: undefined,
      token: this._createToken(),
    };

  }





  return Users;
};