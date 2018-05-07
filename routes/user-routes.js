'use strict';
const router = require('express').Router();
const db = require('../models');

router.get('/user', (req, res) => {
  if(!req.user) {
    res.redirect('/login');
    return;
  }

  let UserId = req.user.id;
  res.redirect('/user/'+ UserId);
});

router.get('/user/:id', (req, res) => {
  let isThisUser;
  
  if(!req.user) {
    isThisUser = false;
  } else {
    isThisUSer = req.user.id == req.params.id;
  }

  db.User.findById(req.params.id).then(user => {
    return user.getRecipes();
  }).then(recipes => {
    res.render('user-list', {recipes, isThisUser});
  });  
});

module.exports = router;