const PORT = 8080;

require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/login/google/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      // return cb(err, user);
    // });
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

let app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(require('express-session')({
  secret: 'keyboard cat', 
  resave: true, 
  saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json(req.user);
});

app.get('/login', (req, res) => {
  res.send(`<a href="/login/google">Log In with Google</a>`)
})

app.get('/login/google', 
  passport.authenticate('google', {scope: ['profile']}));

app.get('/login/google/return', 
  passport.authenticate('google', {failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile', (req, res) => {
  res.json(req.user);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});