/*jshint esversion:6*/
const chai = require('chai');
const expect = chai.expect;

const articles = require("../db/articles.js");
let articlesDB;

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
      articlesDB.add(article);
      expect(articlesDB.all()).to.be.deep.equal([{'title':'title','author':'author','body':'body','urlTitle':'title'}]);
    });

  });
});