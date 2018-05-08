'use strict';
const router = require('express').Router();
const db = require('../models');
const scrape = require('../scripts/scrape.js');

router.get('/api/user', (req, res) =>{
  db.User.findAll()
    .then(users => res.json(users));
});

router.get('/api/recipe', (req, res) => {
  db.Recipe.findAll()
    .then(recipes => res.json(recipes));
});

router.get('/api/recipe/:id', (req, res) => {
  db.Recipe.findById(req.params.id).then(recipe => {
    res.json(recipe);
  }).catch(err => {
    res.status(404).send(err);
  });
})

function scrapeToRecipe(url, recipe) {
  return scrape(url).then(scraped => {
    recipe.title = scraped.name;
    recipe.url = url;
    recipe.img = scraped.image;
    recipe.ingredients = scraped.ingredients;
    recipe.directions = scraped.directions;
    recipe.time = scraped.time;

    return recipe.save();
  });
}

// {"url": url}
router.post('/api/recipe', (req, res) => {
  let url = req.body.url;
  let UserId = req.user.id;
  let recipeEntry;
  db.Recipe
    .findOrCreate({ 
      where: {url}
    })
    .spread((recipe, created) => {
      recipeEntry = recipe;
      if(created) {
        return scrapeToRecipe(url, recipe);
      } else {
        return recipe;
      }
    })
    .then(recipe => {
      if(req.user && req.user.id) {
        // set association
        recipe.setUsers([req.user.id]);
      }
      res.status(200).send('Added');
    })
    .catch(err => {
      console.log(err)
      if(recipeEntry) recipeEntry.destroy();
      res.status(404).send(err);
    });
});

module.exports = router;