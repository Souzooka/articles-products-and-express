/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const articleDatabase = require('../db/articles.js');

router.route('/')
      // Retrieves the index page
      .get((req, res) => {
        articleDatabase.all()
        .then( (data) => {
          const articles = { 'articles': data };
          res.render('articles/index', articles);
        })
        .catch( (err) => {
          console.log('GET /ARTICLES ERROR ' + err);
        });
      })
      // Creates a new product if successful, and brings user back to the index.
      // Otherwise alerts the user with an error.
      .post((req, res) => {
        if (articleDatabase.add(req.body)) {
          const articles = { 'articles': articleDatabase.all() };
          res.render('articles/index', articles);
        } else {
          const error = { 'error': 'Error: Invalid form information!'};
          res.render('articles/new', error);
        }
      });

// Brings the user to a form which will submit a POST for a new item
router.route('/new')
      .get((req, res) => {
        res.render('articles/new', null);
      });

router.route('/:title')
      .get((req, res) => {
        const article = articleDatabase.getByTitle(req.params.title);
        if (article) {
          res.render('articles/article', article);
        } else {
          res.sendStatus(404);
        }
      })
      .put((req, res) => {
        req.body.title = req.params.title;
        if (articleDatabase.editArticle(req.body)) {
          const article = articleDatabase.getByTitle(req.params.title);
          res.render('articles/article', article);
        } else {
          const error = { 'error': 'Error: Invalid form information!' };
          Object.assign(error, req.body);
          res.render('articles/edit', error);
        }
      })
      .delete((req, res) => {
        if (articleDatabase.deleteByTitle(req.params.title)) {
          const articles = { 'articles': articleDatabase.all() };
          res.render('articles/index', articles);
        } else {
          const error = { 'error': 'Error: Somehow hell froze over and deleting this resource failed.' };
          Object.assign(error, req.body);
          res.render('articles/edit', error);
        }
      });

router.route('/:title/edit')
      .get((req, res) => {
        const article = articleDatabase.getByTitle(req.params.title);
        if (article) {
          res.render('articles/edit', article);
        } else {
          res.sendStatus(404);
        }
      });



module.exports = router;