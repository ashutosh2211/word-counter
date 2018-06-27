# Description:

Given a book in a text file (http://www.loyalbooks.com/download/text/Railway-Children-by-E-Nesbit.txt for example)

Write an application that outputs the individual words that appear in the book, and how many times that word appears in the text file.
The second part is to also output whether the number of times each word appears is a prime number.
 
The following assumptions can be made:
- Ignore punctuation and capitalisation
- TDD is expected

# Word-Count

Implements a CLI to count words given a file path.

## Stack

* NodeJS

* Mocha (Testing framework)

## Requirements
Install Node v10.x.x and npm from terminal

run commands:

```
$ cd <(root directory where package.json exists)>
$ npm install

```

## Installation:

cd <(root directory where package.json exists)>
npm install

## Testing

Unit Tests are written using mocha, chai and chai-as-promised

```
$ npm test
```

## Running the cli:

```
$ node src/cli.js -f files/Railway-Children-by-E-Nesbit
```

## Development
I have used streams to read the file asynchronously in chunks and split the text and store the resultant words in an
Object. The cli script invokes the processor which takes the wordCounter and filePath to process the file.
