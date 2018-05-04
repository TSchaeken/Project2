'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    googleId: DataTypes.STRING
  }, {});
  
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};