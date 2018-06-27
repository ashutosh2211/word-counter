const chai = require('chai');
const Processor = require('../processor');
const WordCounter = require('../word-counter');
const chaiAsPromised = require('chai-as-promised');
const stream = require('stream');

chai.use(chaiAsPromised);

describe('Test Processor', function() {

  let wordCounter;
  beforeEach(function() {
    wordCounter = new WordCounter();
  });

  describe('Test getFileStream', function() {

    it('with proper filePath', function() {
      const processor = new Processor('./files/Railway-Children-by-E-Nesbit', wordCounter);
      return chai.expect(processor.getFileStream())
        .to.eventually.be.an.instanceof(stream.Readable);

    });

    it('with wrong filePath', function() {
      const processor = new Processor('test', wordCounter);
      const res = processor.getFileStream();
      return res.then(stream => {
        stream.on('error', (err) => {
          return chai.expect(err).to.be.an.instanceof(Error);
        });
      });
    });

  });

  describe('Test transform', function() {

    let wordCounter,
      processor;

    beforeEach(function() {
      wordCounter = new WordCounter();
      processor = new Processor('test', wordCounter);
    });

    it('test transform with text', function() {
      const data = 'The quick brown fox jumps over the lazy dog \n';
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
      processor.transform(wordCounter, data);
      return chai.expect(wordCounter.wordCountMap)
        .deep.equal(expectedResp);
    });

    it('test transform without text', function() {
      const expectedResp = {};
      processor.transform(wordCounter, '');
      return chai.expect(wordCounter.wordCountMap)
        .deep.equal(expectedResp);
    });
  });

  describe('Test getLine', function() {

    let wordCounter,
      processor;

    beforeEach(function() {
      wordCounter = new WordCounter();
      processor = new Processor('test', wordCounter);
    });

    it('test getLine with text', function() {
      const data = 'The quick brown fox jumps over the lazy dog \n';
      const g = processor.getLine(data);
      const val = g.next().value;
      return chai.expect(val.line).deep.equal(data);
    });

    it('test getLine without text', function() {
      const expectedResp = {};
      processor.transform(wordCounter, '');
      return chai.expect(wordCounter.wordCountMap)
        .deep.equal(expectedResp);
    });
  });

  describe('Test process', function() {
    let wordCounter;

    beforeEach(function() {
      wordCounter = new WordCounter();
    });

    it('with proper filePath', function() {
      const processor = new Processor('./src/spec/files/test', wordCounter);
      const res = processor.process();
      return chai.expect(res)
        .to.eventually.be.an.instanceof(WordCounter);
    });

    it('with improper filePath', function() {
      const processor = new Processor('/test', wordCounter);
      const res = processor.process();
      return chai.expect(res)
        .to.eventually.be.rejected;
    });
  });

});
