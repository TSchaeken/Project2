'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Recipes', [{
      title: 'Fried Chicken',
      url: 'https://www.foodnetwork.com/recipes/fried-chicken-recipe10-3381583'
    }, {
      title: 'Southern Cornbread',
      url: 'https://www.foodnetwork.com/recipes/cat-cora/southern-cornbread-recipe-1973203'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recipes', null, {});
  }
};
