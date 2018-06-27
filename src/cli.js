const WordCounter = require('./word-counter');
const Processor = require('./processor');
const errors = require('./errors');
const PrimeChecker = require('./prime-checker');
const program = require('commander');

function display(response) {
  console.log(JSON.stringify(response, null, 4));
}

program
  .option('-f, --filePath <required>', 'File Path')
  .parse(process.argv);

if (!program.filePath) {
  throw errors.FilePathMissing;
}

const wordCounter = new WordCounter();
const processor = new Processor(program.filePath, wordCounter);

processor.process()
  .then((wCount) => {
    const primeChecker = new PrimeChecker(wCount.maxCount);
    return wCount.getWordsByOccurrence().map(r => {
      const obj = Object.assign({}, r);
      obj.isPrime = primeChecker.isPrime(r.count);
      return obj;
    });
  })
  .then(display)
  .catch(err => {
    console.log(err);
  });
