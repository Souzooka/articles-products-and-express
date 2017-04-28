/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const articleDatabase = require('../db/articles.js');

router.route('/')
  // Retrieves the index page
  .get((req, res) => {
    articleDatabase.all()
    .then( (data) => {
      data.forEach((v, i) => {
        data[i].urlTitle = encodeURIComponent(data[i].title);
      });
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
    articleDatabase.add(req.body)
    .then( (data) => {
      res.redirect('/articles');
    })
    .catch( (err) => {
      console.log('POST /ARTICLES ERROR ' + err);
    });
  });

// Brings the user to a form which will submit a POST for a new item
router.route('/new')
  .get((req, res) => {
    res.render('articles/new', null);
  });

router.route('/:title')
  .get((req, res) => {
    articleDatabase.getByTitle(req.params.title)
    .then( (data) => {
      const article = data[0];
      if (data) {
        data.forEach((v, i) => {
          data[i].urlTitle = encodeURIComponent(data[i].title);
        });
        res.render('articles/article', article);
      } else {
        throw new Error('err');
      }
    })
    .catch( (err) => {
      console.log('GET /ARTICLES/:title ERROR ' + err);
    });
  })
  .put((req, res) => {
    req.body.title = req.params.title;
    articleDatabase.editArticle(req.body)
    .then( (data) => {
      if (data) {
        res.redirect(`/articles/${req.params.title}`);
      } else {
        throw new Error(data);
      }
    })
    .catch( (err) => {
      const error = { 'error': 'Error: Invalid form information.' };
      Object.assign(error, req.body);
      res.render('articles/edit', error);
      console.log('PUT articles/:id error' + err);
    });
  })
  .delete((req, res) => {
    articleDatabase.deleteByTitle(req.params.title)
    .then( (data) => {
      if (data) {
        res.redirect('/articles');
      } else {
        throw new Error(data);
      }
    })
    .catch( (err) => {
      const error = { 'error': 'Error: Somehow hell froze over and deleting this resource failed.' };
      Object.assign(error, req.body);
      res.render('articles/edit', error);
      console.log('DELETE articles/:id error' + err);
    });
  });

router.route('/:title/edit')
  .get((req, res) => {
    articleDatabase.getByTitle(req.params.title)
    .then( (data) => {
      const article = data[0];
      if (data) {
        data.forEach((v, i) => {
          data[i].urlTitle = encodeURIComponent(data[i].title);
        });
        res.render('articles/edit', article);
      } else {
        throw new Error('err');
      }
    })
    .catch( (err) => {
      console.log('GET /ARTICLES/:title/edit ERROR ' + err);
      res.sendStatus(404);
    });
  });


module.exports = router;