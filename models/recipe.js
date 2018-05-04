'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    instruction: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    time: DataTypes.STRING
  }, {});
  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Recipe;
};