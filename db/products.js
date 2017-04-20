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
    *   A product object.
    * Return values:
    *   true (if the object contains the keys 'name', 'price' 'inventory' &&
    *         price and inventory can be represented as numbers           &&
    *         inventory is a non-negative number)
    *      OR
    *   false (any other case)
    * Behavior:
    *   Verifies if an product is eligible to be posted or not.
    *   Also strips object of any additional properties.
    */
  function _validateNewProduct(product) {

    if ((product.name)                        &&
        (!isNaN(Number(product.price)))       &&
        (!isNaN(Number(product.inventory)))   &&
        (Number(product.inventory) >= 0))     {

      // strip product of any additional properties it may have.
      // cast strings to numbers if needed.
      product = {
        'name'       :   product.name,
        'price'      :   Number(product.price),
        'inventory'  :   Number(product.inventory)
      };

      return true;
    } else {
      return false;
    }
  }

  /** function _indexOfProduct(id)
    * Parameters:
    *   An product title.
    * Return values:
    *   Number representing the position of an product inside of the _products array.
    *     OR
    *   -1 if the product is not found.
    * Behaid
    *   Creates an array of each product's title properties, then calls indexOf(id) on this array.
    *   Returns this result.
    */
  function _indexOfProduct(id) {
    return _products.map((product) => {
                  return product.id;
                })
                .indexOf(id);
  }

  /** function _add(product)
    * Parameters:
    *   An obj with these keys:
    *     String name
    *     Number price
    *     Number inventory
    * Return values:
    *   true (if the function was performed successfully)
    *     OR
    *   false (if the function was NOT performed successfully)
    * Behavior:
    *   Adds an object with the properties name, price, and inventory to closure-scoped array _products.
    *   In addition, the added object will also have the new property id.
    *   id is generated from variable productID, and productID is incremented when it is used.
    */
  function _add(product) {
    if (_validateNewProduct(product)) {
      product.id = productID;
      ++productID;
      _products.push(product);
      return true;
    } else {
      return false;
    }
  }

  /** function _getById(id)
    * Parameters:
    *   The ID of a product
    * Return values:
    *   The product object
    *     OR
    *   false (not found)
    * Behavior:
    *   Uses _indexOfProduct() to find an product object in the _products array and return it.
    */
  function _getById(id) {
    const index = _indexOfProduct(id);

    if (index !== -1) {
      return _products[index];
    } else {
      return false;
    }
  }

  /** function _editProduct(newProductProps)
    * Parameters:
    *   New product properties. NOTE: id is required!
    * Return values:
    *   true (if the function was performed successfully)
    *     OR
    *   false (if the function was NOT performed successfully)
    * Behavior:
    *   Uses _indexOfArticle() to find the index of an object in _articles.
    *   This object is spliced out with newArticle, if newArticle passes validation.
    */
  function _editProduct(newProductProps) {
    const index = _indexOfProduct(newProductProps.id);

    if (index === -1) {
      // Product not found
      return false;
    } else {
      const product = _products.splice(index, 1);
      const id = product.id;

      // Maintain a copy of the found object in case new properties are invalid
      const productCopy = {};
      Object.assign(productCopy, product);

      // Copy new values over to product
      Object.assign(product, newProductProps);

      // if the new product is valid, splice it back in.
      // Otherwise splice our copy back in.
      if (_validateNewProduct(product)) {
        product.id = id;
        _products.splice(index, 0, product);
        return true;
      } else {
        _products.splice(index, 0, productCopy);
        return false;
      }
    }
  }

  /** function _deleteById(id)
    * Parameters:
    *   The title of an product.
    * Return values:
    *   true (if the function was performed successfully)
    *     OR
    *   false (if the function was NOT performed successfully)
    * Behavior:
    *   Uses _indexOfProduct() to find the index of an object in _products.
    *   This object is spliced out.
    */
  function _deleteById(title) {
    const index = _indexOfProduct(title);

    if (index === -1) {
      // Product not found
      return false;
    } else {
      _products.splice(index, 1);
      return true;
    }
  }


  return {
    all: _all,
    add: _add,
    getById: _getById,
    editProduct: _editProduct,
    deleteById: _deleteById
  };
})/*()*/;
