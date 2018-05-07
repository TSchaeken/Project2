'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    instruction: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    time: DataTypes.STRING,
  }, {});
  
  Recipe.associate = function(models) {
    Recipe.belongsToMany(models.User, {through: 'UserRecipes'});
  };
  return Recipe;
};