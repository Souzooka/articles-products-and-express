/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const productDatabase = require('../db/products.js');

router.route('/')

  // Retrieves the index page
  .get((req, res) => {
    productDatabase.all()
    .then( (data) => {
      const products = { 'products': data };
      res.render('products/index', products);
    })
    .catch( (err) => {
      console.log('GET /PRODUCTS ERROR ' + err);
    });
  })

  // Creates a new product if successful, and brings user back to the index.
  // Otherwise alerts the user with an error.
  .post((req, res) => {
    productDatabase.add(req.body)
    .then( (data) => {
      res.redirect('/products');
    })
    .catch( (err) => {
      console.log('POST /PRODUCTS ERROR ' + err);
    });
  });

// Brings the user to a form which will submit a POST for a new item
router.route('/new')
  .get((req, res) => {
    res.render('products/new', null);
  });

router.route('/:id')
  .get((req, res) => {
    productDatabase.getById(Number(req.params.id))
    .then( (data) => {
      const product = data[0];
      if (data) {
        res.render('products/product', product);
      } else {
        throw new Error('err');
      }
    })
    .catch( (err) => {
      console.log('GET /PRODUCTS/:id ERROR ' + err);
      res.sendStatus(404);
    });
  })
  .put((req, res) => {
    req.body.id = req.params.id;
    if (productDatabase.editProduct(req.body)) {
      const product = productDatabase.getById(req.params.id);
      res.render('products/product', product);
    } else {
      const error = { 'error': 'Error: Invalid form information!' };
      Object.assign(error, req.body);
      res.render('products/edit', error);
    }
  })
  .delete((req, res) => {
    productDatabase.deleteById(req.params.id)
    .then( (data) => {
      if (data) {
        res.redirect('/products');
      } else {
        throw new Error(data);
      }
    })
    .catch( (err) => {
      const error = { 'error': 'Error: Somehow hell froze over and deleting this resource failed.' };
      Object.assign(error, req.body);
      res.render('products/edit', error);
      console.log('DELETE products/:id error' + err);
    });
  });

router.route('/:id/edit')
  .get((req, res) => {
    productDatabase.getById(Number(req.params.id))
    .then( (data) => {
      const product = data[0];
      if (data) {
        res.render('products/edit', product);
      } else {
        throw new Error('err');
      }
    })
    .catch( (err) => {
      console.log('GET /PRODUCTS/:id/edit ERROR ' + err);
      res.sendStatus(404);
    });
  });



module.exports = router;