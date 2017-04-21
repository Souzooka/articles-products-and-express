/*jshint esversion:6*/
const express = require('express');
const router = express.Router();

router.route('/')
      // Retrieves the index page
      .get((req, res) => {
        res.render('index', null);
      });

module.exports = router;