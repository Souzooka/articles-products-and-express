module.exports = (function(){

  // Holds an array of article objects.
  // no touch
  let _articles = [];

  /** function _all()
    * Parameters:
    *   void
    * Return values:
    *   Closure-scoped array articles
    * Behavior:
    *   Getter function. Returns articles.
    */
  function _all() {
    return _articles;
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
    */
  function _validateNewArticle(article) {
    //TODO
  }

  /** function _indexOfArticle(title)
    * Parameters:
    *   An article title.
    * Return values:
    *   Number representing the position of an article inside of the _articles array.
    *     OR
    *   -1 if the article is not found.
    * Behavior:
    *   TODO
    */
  function _indexOfArticle(title) {
    //TODO
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
    //TODO
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
    //TODO
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
  function _editByTitle(title, newArticle) {}

  return {
    all: _all,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle
  };
})();
