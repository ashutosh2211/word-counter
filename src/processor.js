const fs = require('fs');
const errors = require('./errors');

/**
 * Processes a given file and exposes functions to get word counts for the file content
 * @class Represents the processor which uses
 */
class Processor {

  constructor(filePath, wordCounter) {
    this.filePath = filePath;
    this.previousChunk = '';
    this.wordCounter = wordCounter;
  }

  /**
   * Returns a Readable stream for the given filePath
   * @param {Number} chunkSize the size of the chunk returned by the stream
   * @return {Promise} Promise that resolves to a readable stream
   */
  getFileStream(chunkSize = 1024) {
    return new Promise((resolve, reject) => {
      if (!this.filePath) {
        reject(errors.InvalidFilePath);
      } else {
        const stream = fs.createReadStream(this.filePath, {encoding: 'utf8', highWaterMark: chunkSize});
        resolve(stream);
      }
    });
  }

  /**
   * Counts the number of words present in a string and adds them to the wordCounter object
   * @param {WordCounter} wordCounter object that counts words for a given chunk of data
   * @param {String} data which is to be tokenized and counted
   * @return
   */
  transform(wordCounter, data) {
    const g = this.getLine(data);
    for (let obj of g) {
      const line = obj.line;
      this.previousChunk = obj.previous;
      wordCounter.count(line);
    }
  }

  /**
   * Generator function to split given chunk into lines
   * @param {String} chunk is the input data
   * @return {Object} yields object which contains the current line in chunk or the remaining chunk to be used in next
   * iteration
   */
  * getLine(chunk) {
    let previous = this.previousChunk;
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf('\n')) >= 0) {
      const line = previous.slice(0, eolIndex + 1);
      yield {
        line,
        previous: '',
      };
      previous = previous.slice(eolIndex + 1);
    }
    if (previous.length > 0) {
      yield {
        line: '',
        previous,
      };
    }
  }

  /**
   * Processes the given file and returns the count of occurrences of each word in the file
   * @return {Promise} Returns a promise that resolves to wordCounter object or is rejected with error
   */
  async process() {
    let stream;
    try {
      stream = await this.getFileStream();
    } catch (err) {
      return Promise.reject(err);
    }
    const boundTransform = this.transform.bind(this, this.wordCounter);
    return new Promise((resolve, reject) => {
      stream.on('data', boundTransform);
      stream.on('error', (err) => {
        reject(err);
      });
      stream.on('close', () => {
        this.wordCounter.count(this.previousChunk);
        resolve(this.wordCounter);
      });
    });
  }

}

module.exports = Processor;
