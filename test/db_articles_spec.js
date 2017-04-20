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

  describe('add', () => {

    it('should add articles', () => {
      let article = {
        'title'   :   'title',
        'author'  :   'author',
        'body'    :   'body'
      };
      expect(articlesDB.add(article)).to.be.deep.equal([{'title':'title','author':'author','body':'body'}]);
    });

  });
});