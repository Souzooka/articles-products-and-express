var chai = require('chai');
var expect = chai.expect;

var articles = require("../db/articles.js");

describe('Articles Database', () => {

  beforeEach(function() {
    articlesDB = articles();
  });

  describe('all', () => {

    it('should return articles', () => {
      expect(articlesDB.all()).to.be.deep.equal([]);
    });

  });
});