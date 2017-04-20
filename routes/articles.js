const Articles = require('../db/articles.js');
const express = require('express');
const router = express.Router();

// If an empty URI GET is requested
// serve index.html
router.route('/')
      .get((req, res) => {
        res.sendFile('index.html');
      });

module.exports = router;

/*// returns the entire collection
Articles.all();

// adds a new article to the collection
Articles.add();

// returns the correct object from the collection
Articles.getByTitle('The%20Best%20Magpie%20Developer%20of%202016');

// finds an article in the collection by its title, if found - updates the article based on object passed as the second parameter then returns `true`
// in the example below, it would change the title.
// if the article is not found, returns `false`
Articles.editByTitle('The%20Best%20Magpie%20Developer%20of%202016', { title: "..."});
*/