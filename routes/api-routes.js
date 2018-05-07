'use strict';
const router = require('express').Router();
const db = require('../models');

router.get('/api/recipe', (req, res) => {
  db.Recipe.findAll()
    .then(recipes => res.json(recipes));
});

router.get('/api/user', (req, res) =>{
  db.User.findAll()
    .then(users => res.json(users));
});

// {"url": url}
router.post('/api/recipe', (req, res) => {
  let url = req.body.url;
  let UserId = req.user.id;
  db.Recipe
    .findOrCreate({ 
      where: {url}
    })
    .spread((recipe, created) => {
      if(created) {
        // parse page
        // update recipe
        // return recipe.save();
        return recipe;
      } else {
        return recipe;
      }
    })
    .then(recipe => {
      if(req.user && req.user.id) {
        // set association
        recipe.setUsers([req.user.id]);
      }
      res.json(recipe);
    });
});

module.exports = router;