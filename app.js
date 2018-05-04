const PORT = process.env.PORT || 8080;

const express = require('express');
const path = require('path');
const db = require('./models//index.js');
const app = express();

app.engine("handlebars", require('express-handlebars')({
  defaultLayout: "main",
  helpers: {
    section: function(name, options) { 
      if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
  }
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(require('./routes/login-routes.js'));

app.get('/', (req, res) => {
  res.json(req.user);
});

db.sequelize.sync().then(() => {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});