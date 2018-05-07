'use strict';
const PORT = process.env.PORT || 8080;

const path = require('path');
const db = require('./models/index.js');
const express = require('express');
const app = express();

app.engine('.hbs', require('express-handlebars')({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    section(name, options) { 
      if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    }
  }
}));
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(require('./routes/login-routes.js'));
app.use(require('./routes/api-routes.js'));
app.use(require('./routes/user-routes.js'));

app.get('/', (req, res) => {
  res.render('index', {});
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
  });
});