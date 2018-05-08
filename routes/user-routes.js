'use strict';
const router = require('express').Router();
const db = require('../models');

router.get('/user', (req, res) => {
  if(!req.user) {
    res.redirect('/login');
    return;
  }
  res.redirect('/user/' + req.user.id);
});

router.get('/user/:id', (req, res) => {
  let userName;
  db.User.findById(req.params.id).then(user => {
    userName = user.name;
    if(user) return user.getRecipes();
    return Promise.reject('No such user');
  }).then(recipes => {
    // true if this is logged-in user's page
    let isThisUser = !!req.user && (req.user.id == req.params.id);
    res.render('user-list', {recipes, isThisUser, userName});
  }).catch(err => {
    res.status(404).send(err);
  });  
});

module.exports = router;