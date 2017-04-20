/*jshint esversion:6*/
const express = require('express');
const bodyParser = require('body-parser');
const articlesRoutes = require('./routes/articles.js');
const productsRoutes = require('./routes/products.js');

const app = express();

// Log time upon request
app.use( (req, res, next) => {
  console.log(`Connection received. Time: ${new Date().toUTCString()}`);
  next();
});

// parse application/x-www-form-urlencoded
// attach to req.body
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use('/articles', articlesRoutes);
app.use('/products', productsRoutes);

// Initialize server
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});

// For testing
module.exports = server;