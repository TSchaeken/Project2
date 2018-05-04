'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recipe = sequelize.define(
    'Recipe',
    {
      title: DataTypes.STRING,
      instruction: DataTypes.STRING,
      ingredients: DataTypes.STRING,
      time: DataTypes.STRING
    },
    {}
  );

  Recipe.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Recipe;
};
