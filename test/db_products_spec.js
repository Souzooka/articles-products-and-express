/*jshint esversion:6*/
const chai = require('chai');
const expect = chai.expect;

const products = require("../db/products.js");
let productsDB;

describe('Products Database', () => {

  beforeEach(function() {
   productsDB = products();
  });

  describe('all()', () => {

    it('should return products', () => {
      expect(productsDB.all()).to.be.deep.equal([]);
    });

  });

  describe('add()', () => {

    it('should add products', () => {
      let product = {
        'name'      : 'name',
        'price'     : '9',
        'inventory' : '9'
      };
      productsDB.add(product);
      expect(productsDB.all()).to.be.deep.equal([{
        'id'        : 0,
        'name'      : 'name',
        'price'     : 9,
        'inventory' : 9
      }]);
    });

    it('should be able to add more than 1 product', () => {
      let product = {
        'name'      : 'name',
        'price'     : '9',
        'inventory' : '9'
      };
      productsDB.add(product);
      product = {
        'name'      : 'other name',
        'price'     : '9',
        'inventory' : '9'
      };
      productsDB.add(product);
      expect(productsDB.all()).to.be.deep.equal(
      [{
        'id'        : 0,
        'name'      : 'name',
        'price'     : 9,
        'inventory' : 9
      },
      {
        'id'        : 1,
        'name'      : 'other name',
        'price'     : 9,
        'inventory' : 9
      }
      ]);
    });

    describe('validation', () => {

      it('add() should return true if input is valid', () => {
        let product = {
          'name'      : 'name',
          'price'     : '9',
          'inventory' : '9'
        };
        expect(productsDB.add(product)).to.be.equal(true);
      });

      it('add() should return false if input is invalid', () => {
        let product = {
          'name'      : 'name',
          'price'     : 'b9',
          'inventory' : '9ase'
        };
        expect(productsDB.add(product)).to.be.equal(false);
      });

    });
  });
});