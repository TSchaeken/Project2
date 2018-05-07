'use strict';

function jsonGet(name) {
  return function() {
    return JSON.parse(this.getDataValue(name));
  }
}

function jsonSet(name) {
  return function(value) {
    this.setDataValue(name, JSON.stringify(value));
  }
}

module.exports = (sequelize, DataTypes) => {
  var Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    img: DataTypes.STRING,
    ingredients: {
      type: DataTypes.TEXT,
      get: jsonGet('ingredients'),
      set: jsonSet('ingredients')
    },
    directions: {
      type: DataTypes.TEXT,
      get: jsonGet('directions'),
      set: jsonSet('directions')
    },
    time: {
      type: DataTypes.TEXT,
      get: jsonGet('time'),
      set: jsonSet('time')
    }
  }, {});
  
  Recipe.associate = function(models) {
    Recipe.belongsToMany(models.User, {through: 'UserRecipes'});
  };
  return Recipe;
};