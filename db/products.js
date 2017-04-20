/* jshint esversion:6 */
module.exports = (function(){

  // Holds an array of product objects.
  // no touch
  let _products = [];

  // Counter for productID
  let productID = 0;

  /** function _all()
    * Parameters:
    *   void
    * Return values:
    *   Closure-scoped array products
    * Behavior:
    *   Getter function. Returns products.
    */
  function _all() {
    return _products;
  }

  /** function _validateNewProduct(product)
    * Parameters:
    *   An product object.
    * Return values:
    *   true (if the object contains the keys 'title' and 'body', and the title key is unique)
    *      OR
    *   false (any other case)
    * Behavior:
    *   Verifies if an product is eligible to be posted or not.
    *   Also strips object of any additional properties.
    *   Also imposes length limits (configurable inside function)
    *   ├─title:  255 bytes (255)
    *   ├─author: 255 bytes (255)
    *   └─body:   50 KB     (51200)
    */
  function _validateNewProduct(product) {
    const TITLEMAXLENGTH    =   255;
    const AUTHORMAXLENGTH   =   255;
    const BODYMAXLENGTH     =   51200;

    if ((article.title  && article.title.length   <= TITLEMAXLENGTH)  &&
        (article.author && article.author.length  <= AUTHORMAXLENGTH) &&
        (article.body   && article.body.length    <= BODYMAXLENGTH))  {

      // strip article of any additional properties it may have.
      article = {
        'title'   :   article.title,
        'author'  :   article.author,
        'body'    :   article.body
      };

      return true;
    } else {
      return false;
    }
  }

  /** function _indexOfArticle(title)
    * Parameters:
    *   An article title.
    * Return values:
    *   Number representing the position of an article inside of the _articles array.
    *     OR
    *   -1 if the article is not found.
    * Behavior:
    *   Creates an array of each article's title properties, then calls indexOf(title) on this array.
    *   Returns this result.
    */
  function _indexOfArticle(title) {
    return array.map((article) => {
                  return article.title;
                })
                .indexOf(title);
  }

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
    if (_validateNewArticle(article)) {
      article.urlTitle = encodeURIComponent(article.title);
      _articles.unshift(article);
      return true;
    } else {
      return false;
    }
  }

  /** function _getByTitle(title)
    * Parameters:
    *   The title of an article.
    * Return values:
    *   The article object
    *     OR
    *   false (not found)
    * Behavior:
    *   Uses _indexOfArticle() to find an article object in the _articles array and return it.
    */
  function _getByTitle(title) {
    const index = _indexOfArticle(title);

    if (index !== -1) {
      return _articles[index];
    } else {
      return false;
    }
  }

  /** function _editByTitle(title, newArticle)
    * Parameters:
    *   The title of an article.
    *   A new article object to replace the old one.
    * Return values:
    *   true (if the function was performed successfully)
    *     OR
    *   false (if the function was NOT performed successfully)
    * Behavior:
    *   Uses _indexOfArticle() to find the index of an object in _articles.
    *   This object is spliced out with newArticle, if newArticle passes validation.
    */
  function _editByTitle(title, newArticle) {
    const index = _indexOfArticle(title);

    if (index === -1) {
      // Article not found
      return false;
    }
    else if (_validateNewArticle(newArticle)) {
      _articles.splice(index, 1, newArticle);
      return true;
    } else {
      // Invalid article object
      return false;
    }
  }

  /** function _deleteByTitle(title)
    * Parameters:
    *   The title of an article.
    * Return values:
    *   true (if the function was performed successfully)
    *     OR
    *   false (if the function was NOT performed successfully)
    * Behavior:
    *   Uses _indexOfArticle() to find the index of an object in _articles.
    *   This object is spliced out.
    */
  function _deleteByTitle(title) {
    const index = _indexOfArticle(title);

    if (index === -1) {
      // Article not found
      return false;
    } else {
      _articles.splice(index, 1);
      return true;
    }
  }


  return {
    all: _all,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    deleteByTitle: _deleteByTitle
  };
})/*()*/;
