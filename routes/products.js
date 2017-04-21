const express = require('express');
const router = express.Router();
const productDatabase = require('../db/products.js');

router.route('/')
      // Retrieves the index page
      .get((req, res) => {
        const products = { 'products': productDatabase.all() };
        res.render('products/index', products);
      })
      // Creates a new product if successful, and brings user back to the index.
      // Otherwise alerts the user with an error.
      .post((req, res) => {
        if (productDatabase.add(req.body)) {
          const products = { 'products': productDatabase.all() };
          console.log(products)
          res.render('products/index', products);
        } else {
          const error = { 'error': 'Error: Invalid form information!'};
          res.render('products/new', error);
        }
      });

router.route('/new')
      .get((req, res) => {
        res.render('products/new', null);
      });

module.exports = router;