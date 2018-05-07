'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserRecipes', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      RecipeId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserRecipes');
  }
};
