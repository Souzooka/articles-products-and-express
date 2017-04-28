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

    it('should return products', (done) => {
      let promise = new Promise((resolve, reject) => {
        resolve(productsDB.all());
        reject('error');
      });

      promise.then( (data) => {
        expect(data).to.be.an('array');
        done();
      })
      .catch( (err) => {
        console.log(err);
        done();
      });
    });

  });

  describe('add()', () => {

    it('should add products', () => {
      let length = 0;
      let promise = new Promise((resolve, reject) => {
        resolve(productsDB.all());
        reject('error');
      });

      promise.then( (data) => {
        length = data.length;
      })
      .catch( (err) => {
        console.log(err);
      });

      let product = {
        'name'      : 'name',
        'price'     : '9.99',
        'inventory' : '9'
      };

      let promise2 = new Promise((resolve, reject) => {
        productsDB.add(product);
        resolve(productsDB.all());
        reject('error');
      });

      promise2.then( (data) => {
        expect(data.length).to.be.equal(length+1);
        done();
      })
      .catch( (err) => {
        console.log(err);
      });
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

  describe('getById()', () => {

    it('should retrieve the product obj if given an ID', () => {
      let product = {
        'name'      : 'name',
        'price'     : '9',
        'inventory' : '9'
      };
      productsDB.add(product);
      expect(productsDB.getById(0)).to.be.deep.equal(
      {
        'id'        : 0,
        'name'      : 'name',
        'price'     : 9,
        'inventory' : 9
      });
    });

    it('should return false if the ID is not found', () => {
      expect(productsDB.getById(0)).to.be.equal(false);
    });

  });

  describe('editProduct()', () => {

    it('should edit an existing product', () => {
      let product = {
        'name'      : 'name',
        'price'     : '9',
        'inventory' : '9'
      };
      productsDB.add(product);
      expect(productsDB.editProduct(
      {
        'id'        : '0',
        'name'      : 'a new name',
        'price'     : '9',
        'inventory' : '9'
      })).to.be.equal(true);
      expect(productsDB.all()).to.be.deep.equal([
      {
        'id'        : 0,
        'name'      : 'a new name',
        'price'     : 9,
        'inventory' : 9
      }]);
    });

    describe('validation', () => {

      it('should return false if given an invalid input or func cannot find item', () => {
        expect(productsDB.editProduct({
          'id'        : '0',
          'name'      : 'name',
          'price'     : '9',
          'inventory' : '9'
        })).to.be.equal(false);
        let product = {
          'name'      : 'name',
          'price'     : '9',
          'inventory' : '9'
        };
        productsDB.add(product);
        expect(productsDB.editProduct({
          'id'        : '0',
          'name'      : 'a new name',
          'price'     : '9as',
          'inventory' : '9'
        })).to.be.equal(false);
      });

    });

  });

  describe('deleteById()', () => {

    it('should delete an existing product', () => {
      let product = {
        'name'      : 'name',
        'price'     : '9',
        'inventory' : '9'
      };
      productsDB.add(product);
      expect(productsDB.deleteById(0)).to.be.equal(true);
      expect(productsDB.all()).to.be.deep.equal([]);
    });

    describe('validation', () => {

      it('should return false if the product is not found', () => {
        expect(productsDB.deleteById(0)).to.be.equal(false);
      });

    });
  });
});