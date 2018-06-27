const chai = require('chai');
const WordCount = require('../word-counter');

describe('Test Word Count', function() {

  describe('Test tokenize', function() {

    it('test tokenize with text', function() {
      const text = 'The quick brown fox jumps over the lazy dog';
      const expectedResp = text.split(' ');
      return chai.expect(WordCount.tokenize(text))
        .deep.equal(expectedResp);
    });

    it('test tokenize without text', function() {
      const expectedResp = [];
      return chai.expect(WordCount.tokenize(null))
        .deep.equal(expectedResp);
    });

  });

  describe('Test updateWordMaxCount', function() {
    let wordCount;
    beforeEach(function() {
      wordCount = new WordCount();
    });

    it('test count with simple text', function() {
      wordCount.updateWordMaxCount(2);
      const expectedResp = 2;
      return chai.expect(wordCount.maxCount)
        .deep.equal(expectedResp);
    });

  });

  describe('Test count', function() {
    let wordCount;
    beforeEach(function() {
      wordCount = new WordCount();
    });

    it('test count with simple text', function() {
      const text = 'The quick brown fox jumps over the lazy dog';
      const expectedResp = {
        the: 2,
        quick: 1,
        brown: 1,
        fox: 1,
        jumps: 1,
        over: 1,
        lazy: 1,
        dog: 1,
      };
      wordCount.count(text);
      return chai.expect(wordCount.wordCountMap)
        .deep.equal(expectedResp);
    });

    it('test maxCount with simple text', function() {
      const text = 'The quick brown fox jumps over the lazy dog';
      const expectedResp = 2;
      wordCount.count(text);
      return chai.expect(wordCount.maxCount)
        .deep.equal(expectedResp);
    });

    it('test count without text', function() {
      wordCount.count(null);
      const expectedResp = {};
      return chai.expect(wordCount.wordCountMap)
        .deep.equal(expectedResp);
    });

    it('test maxCount with simple text', function() {
      const expectedResp = 0;
      wordCount.count(null);
      return chai.expect(wordCount.maxCount)
        .deep.equal(expectedResp);
    });

  });

  describe('Test getWordsSortedByOccurrence', function() {
    let wordCount;

    beforeEach(function() {
      wordCount = new WordCount();
    });

    it('with text', function() {
      const text = 'The quick brown fox jumps over the lazy dog';
      const expectedResp = ['the', 'brown', 'dog', 'fox', 'jumps', 'lazy', 'over', 'quick'];
      wordCount.count(text);
      return chai.expect(wordCount.getWordsSortedByOccurrence())
        .deep.equal(expectedResp);
    });

    it('without text', function() {
      wordCount.count(null);
      const expectedResp = [];
      return chai.expect(wordCount.getWordsSortedByOccurrence())
        .deep.equal(expectedResp);
    });
  });

  describe('Test getWordsByOccurrence', function() {
    let wordCount;

    beforeEach(function() {
      wordCount = new WordCount();
    });

    it('with text', function() {
      const text = 'The quick brown fox jumps over the lazy dog';
      const expectedResp = [
        {word: 'the', count: 2},
        {word: 'brown', count: 1},
        {word: 'dog', count: 1},
        {word: 'fox', count: 1},
        {word: 'jumps', count: 1},
        {word: 'lazy', count: 1},
        {word: 'over', count: 1},
        {word: 'quick', count: 1},
      ];
      wordCount.count(text);
      return chai.expect(wordCount.getWordsByOccurrence())
        .deep.equal(expectedResp);
    });

    it('without text', function() {
      wordCount.count(null);
      const expectedResp = [];
      return chai.expect(wordCount.getWordsByOccurrence())
        .deep.equal(expectedResp);
    });
  });

});
