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
    *   Closure-scoped array _products
    * Behavior:
    *   Getter function. Returns products.
    */
  function _all() {
    return db.any('SELECT * FROM $1~;', ['products'])
    .then( (data) => {
      return data;
    })
    .catch( (error) => {
      console.log('all() ' + error);
    });
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
    *   Also imposes length limits (configurable inside function)
    *   └─name:  255 bytes (255)
    */
/*  function _validateNewProduct(product) {
    const NAMEMAXLENGTH = 255;
    const productTemplate = {
        'name'       :   product.name,
        'price'      :   Number(product.price),
        'inventory'  :   Number(product.inventory)
      };

    if ((product.name && product.name.length <= NAMEMAXLENGTH)  &&
        (!isNaN(Number(product.price)))                         &&
        (!isNaN(Number(product.inventory)))                     &&
        (Number(product.inventory) >= 0))                       {

      // strip product of any additional properties it may have.
      // cast strings to numbers if needed.
      for (let i in product) {
        delete product[i];
      }
      Object.assign(product, productTemplate);

      return true;
    } else {
      return false;
    }
  }
*/
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
    product.price = pgp.as.number(Number(product.price));
    product.inventory = pgp.as.number(Number(product.inventory));
    return db.any(`INSERT INTO $1~ (name, price, inventory)
            VALUES ($2, $3, $4);`, ['products', product.name, product.price, product.inventory])
    .then( () => {
      return true;
    })
    .catch(function(error) {
      console.log('add() ' + error);
      return false;
    });
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
    id = pgp.as.number(Number(id));
    return db.any(`SELECT * FROM $1~ WHERE id = $2;`, ['products', id])
    .then( (data) => {
      return data;
    })
    .catch( (error) => {
      return false;
    });
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
  function _editProduct(product) {
    product.price = pgp.as.number(Number(product.price));
    product.inventory = pgp.as.number(Number(product.inventory));
    product.id = pgp.as.number(Number(product.id));
    return db.none('UPDATE $1~ ' +
                   'SET price = $2, inventory = $3, name = $4 ' +
                   'WHERE products.id = $5;', ['products', product.price, product.inventory, product.name, product.id])
    .then( (data) => {
      return true;
    })
    .catch(function(error) {
      console.log(error)
      return false;
    });
  }

  /** function _deleteById(id)
    * Parameters:
    *   The id of an product.
    * Return values:
    *   true (if the function was performed successfully)
    *     OR
    *   false (if the function was NOT performed successfully)
    * Behavior:
    *   Uses _indexOfProduct() to find the index of an object in _products.
    *   This object is spliced out.
    */
  function _deleteById(id) {
    id = pgp.as.number(Number(id));
    return db.none(`DELETE FROM $1~ WHERE products.id = $2;`, ['products', id])
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
    getById: _getById,
    editProduct: _editProduct,
    deleteById: _deleteById
  };
})();
