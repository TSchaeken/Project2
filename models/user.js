'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      googleId: DataTypes.STRING
    },
    {}
  );

  User.associate = function(models) {
    User.belongsToMany(models.Recipe, {through: 'UserRecipes'});
  };
  return User;
};