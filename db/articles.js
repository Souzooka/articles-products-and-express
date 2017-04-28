/* jshint esversion:6 */
module.exports = (function(){

  // import pg-promise
  const pgp = require('pg-promise')();
  const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'articles_and_products',
    user: 'souzooka'
  });

  /** function _all()
    * Parameters:
    *   void
    * Return values:
    *   Closure-scoped array articles
    * Behavior:
    *   Getter function. Returns articles.
    */
  function _all() {
    return db.any('SELECT * FROM $1~;', ['articles'])
    .then( (data) => {
      return data;
    })
    .catch( (error) => {
      console.log('all() ' + error);
    });
  }

  /** function _validateNewArticle(article)
    * Parameters:
    *   An article object.
    * Return values:
    *   true (if the object contains the keys 'title' and 'body', and the title key is unique)
    *      OR
    *   false (any other case)
    * Behavior:
    *   Verifies if an article is eligible to be posted or not.
    *   Also strips object of any additional properties.
    *   Also imposes length limits (configurable inside function)
    *   ├─title:  255 bytes (255)
    *   ├─author: 255 bytes (255)
    *   └─body:   50 KB     (51200)
    */
/*  function _validateNewArticle(article) {
    const TITLEMAXLENGTH    =   255;
    const AUTHORMAXLENGTH   =   255;
    const BODYMAXLENGTH     =   51200;
    const articleTemplate = {
        'title'   :   article.title,
        'author'  :   article.author || 'Unknown Author',
        'body'    :   article.body
      };

    if ((article.title  && article.title.length   <= TITLEMAXLENGTH)  &&
        (                  article.author.length  <= AUTHORMAXLENGTH) &&
        (article.body   && article.body.length    <= BODYMAXLENGTH)   &&
         _indexOfArticle(article.title) === -1)                       {

      // strip article of any additional properties it may have.
      for (let i in article) {
        delete article[i];
      }
      Object.assign(article, articleTemplate);

      return true;
    } else {
      return false;
    }
  }*/

  /** function _add(article)
    * Parameters:
    *   An obj with these keys:
    *     title:  Title for the article -- also used as a unique ID. REQUIRED.
    *     body:   Body for the article. REQUIRED.
    *     author: Author for the article. (Not required? Post as "unknown author" if undefined?)
    * Return values:
    *   true (if the function was performed successfully)
    *     OR
    *   false (if the function was NOT performed successfully)
    * Behavior:
    *   Adds an object with the properties title, body, author to closure-scoped array _articles.
    *   If author is undefined, author will be replaced with "unknown author".
    *   In addition, the added object will also have the new property urlTitle.
    *   urlTitle is a URL encoded version of the title property.
    *   └─Example: ("This is a title") => ("This%20is%20a%20title").
    */
  function _add(article) {
    return db.none(`INSERT INTO $1~ (title, author, content)
            VALUES ($2, $3, $4);`, ['articles', article.title, article.author, article.body])
    .then( () => {
      return true;
    })
    .catch(function(error) {
      console.log('add() ' + error);
      return false;
    });
    if (_validateNewArticle(article)) {
      article.urlTitle = encodeURIComponent(article.title);
      _articles.unshift(article);
      return true;
    } else {
      return false;
    }
  }

  /** function _getByTitle(urlTitle)
    * Parameters:
    *   The urlTitle of an article.
    * Return values:
    *   The article object
    *     OR
    *   false (not found)
    * Behavior:
    *   Uses _indexOfArticle() to find an article object in the _articles array and return it.
    */
  function _getByTitle(urlTitle) {
    const title = decodeURIComponent(urlTitle);
    return db.any(`SELECT * FROM $1~ WHERE title = $2;`, ['articles', title])
    .then( (data) => {
      return data;
    })
    .catch( (error) => {
      return false;
    });
  }

  /** function _editArticle(newArticleProps)
    * Parameters:
    *   New article properties. NOTE: Title is required!
    * Return values:
    *   true (if the function was performed successfully)
    *     OR
    *   false (if the function was NOT performed successfully)
    * Behavior:
    *   Uses _indexOfArticle() to find the index of an object in _articles.
    *   This object is spliced out with new properties, if the obj with those properties passes validation.
    */
  function _editArticle(article) {
    article.title = decodeURIComponent(article.title);
    return db.none('UPDATE $1~ ' +
                   'SET author = $2, content = $3 ' +
                   'WHERE articles.title = $4;', ['articles', article.author, article.body, article.title])
    .then( (data) => {
      return true;
    })
    .catch(function(error) {
      console.log(error)
      return false;
    });
  }

  /** function _deleteByTitle(urlTitle)
    * Parameters:
    *   The urlTitle of an article.
    * Return values:
    *   true (if the function was performed successfully)
    *     OR
    *   false (if the function was NOT performed successfully)
    * Behavior:
    *   Uses _indexOfArticle() to find the index of an object in _articles.
    *   This object is spliced out.
    */
  function _deleteByTitle(urlTitle) {
    title = decodeURIComponent(urlTitle);
    return db.none(`DELETE FROM $1~ WHERE articles.title = $2;`, ['articles', title])
    .then( (data) => {
      return true;
    })
    .catch(function(error) {
      return false;
    });
  }

  return {
    all: _all,
    add: _add,
    getByTitle: _getByTitle,
    editArticle: _editArticle,
    deleteByTitle: _deleteByTitle
  };
})();
