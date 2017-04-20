/*jshint esversion:6*/
const chai = require('chai');
const expect = chai.expect;

const articles = require("../db/articles.js");
let articlesDB;

describe('Articles Database', () => {

  beforeEach(function() {
    articlesDB = articles();
  });

  describe('all()', () => {

    it('should return articles', () => {
      expect(articlesDB.all()).to.be.deep.equal([]);
    });

  });

  describe('add()', () => {

    it('should add articles', () => {
      let article = {
        'title'   :   'title',
        'author'  :   'author',
        'body'    :   'body'
      };
      articlesDB.add(article);
      expect(articlesDB.all()).to.be.deep.equal([{
        'title':'title',
        'author':'author',
        'body':'body',
        'urlTitle':'title'
      }]);
    });

    it('should be able to add more than 1 article', () => {
      let article = {
        'title'   :   'title',
        'author'  :   'author',
        'body'    :   'body'
      };
      articlesDB.add(article);
      article = {
        'title'   :   'newTitle',
        'author'  :   'author',
        'body'    :   'body'
      };
      articlesDB.add(article);
      expect(articlesDB.all()).to.be.deep.equal(
      [{
        'title':'newTitle',
        'author':'author',
        'body':'body',
        'urlTitle':'newTitle'
      },
      {
        'title':'title',
        'author':'author',
        'body':'body',
        'urlTitle':'title'
      }
      ]);
    });

    it('should add articles and add a urlencoded urlTitle property', () => {
      let article = {
        'title'   :   'this is a title',
        'author'  :   'author',
        'body'    :   'body'
      };
      articlesDB.add(article);
      expect(articlesDB.all()).to.be.deep.equal([
      {
        'title':'this is a title',
        'author':'author',
        'body':'body',
        'urlTitle':'this%20is%20a%20title'
      }
      ]);
    });

    describe('validation', () => {

      it('add() should return true if input is valid', () => {
        let article = {
          'title'   :   'title',
          'author'  :   'author',
          'body'    :   'body'
        };
        expect(articlesDB.add(article)).to.be.equal(true);
      });

      it('add() should return false if input is invalid', () => {
        let article = {
          'author'  :   'author',
          'body'    :   'body'
        };
        expect(articlesDB.add(article)).to.be.equal(false);
        article = {
          'title'   :   'title',
          'author'  :   'author',
        };
        expect(articlesDB.add(article)).to.be.equal(false);
      });

      it('add() should return false if given an article with a non-unique title', () => {
        let article = {
          'title'   :   'title',
          'author'  :   'author',
          'body'    :   'body'
        };
        expect(articlesDB.add(article)).to.be.equal(true);
        expect(articlesDB.add(article)).to.be.equal(false);
        expect(articlesDB.all()).to.be.deep.equal([
        {
        'title':'title',
        'author':'author',
        'body':'body',
        'urlTitle':'title'
        }
        ]);
      });
    });
  });

  describe('getByTitle()', () => {

    it('should return an article object corresponding to the passed-in title', () => {
      let article = {
        'title'   :   'title',
        'author'  :   'author',
        'body'    :   'body'
      };
      articlesDB.add(article);
      article = {
        'title'   :   'this is a title',
        'author'  :   'author',
        'body'    :   'body'
      };
      articlesDB.add(article);
      expect(articlesDB.getByTitle('title')).to.be.deep.equal(
      {
        'title'   :   'title',
        'author'  :   'author',
        'body'    :   'body',
        'urlTitle':   'title'
      });
    });

    it('should return false if the article is not found', () => {
      expect(articlesDB.getByTitle('title')).to.be.equal(false);
    });

  });

});