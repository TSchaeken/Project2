'use strict';
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/index.js');
const callbackURL = process.env.NODE_ENV === 'production' ? 
  'https://cook-book-96847.herokuapp.com/login/google/return' : 
  'http://localhost:8080/login/google/return';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    db.User
      .findOrCreate({
        where: {googleId: profile.id},
        defaults: {name: profile.displayName}
      })
      .spread((user, created) => cb(null, user))
      .catch(err => cb(err, null));
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

module.exports = passport;