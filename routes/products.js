const express = require('express');
const router = express.Router();
const productDatabase = require('../db/products.js');

router.route('/')
      .get((req, res) => {
        const products = productDatabase.all();
        res.render('products/index', products);
      });

module.exports = router;