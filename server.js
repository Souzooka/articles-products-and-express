/*jshint esversion:6*/
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const articlesRoutes = require('./routes/articles.js');
const productsRoutes = require('./routes/products.js');
const indexRoutes = require('./routes/index.js');

const app = express();
const handlebars = require('express-handlebars');
const PORT = 3000;

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// Log time upon request
app.use( (req, res, next) => {
  console.log(`Connection received. Time: ${new Date().toUTCString()}`);
  next();
});

// method-override
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
// attach to req.body
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use('/', indexRoutes);
app.use('/articles', articlesRoutes);
app.use('/products', productsRoutes);

// Initialize server
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});

// For testing
module.exports = server;