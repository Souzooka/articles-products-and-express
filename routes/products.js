/*jshint esversion:6*/
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
          res.render('products/index', products);
        } else {
          const error = { 'error': 'Error: Invalid form information!'};
          res.render('products/new', error);
        }
      });

// Brings the user to a form which will submit a POST for a new item
router.route('/new')
      .get((req, res) => {
        res.render('products/new', null);
      });

router.route('/:id')
      .get((req, res) => {
        const product = productDatabase.getById(Number(req.params.id));
        console.log(req.params.id);
        if (product) {
          res.render('products/product', product);
        } else {
          res.sendStatus(404);
        }
      })
      .put((req, res) => {
        req.body.id = req.params.id;
        if (productDatabase.editProduct(req.body)) {
          const product = productDatabase.getById(Number(req.params.id));
          res.render('products/product', product);
        }
      })
      .delete((req, res) => {
        if (productDatabase.deleteById(req.params.id)) {
          const products = { 'products': productDatabase.all() };
          res.render('products/index', products);
        }
      });

router.route('/:id/edit')
      .get((req, res) => {
        const product = productDatabase.getById(Number(req.params.id));
        if (product) {
          res.render('products/edit', product);
        } else {
          res.sendStatus(404);
        }
      });



module.exports = router;