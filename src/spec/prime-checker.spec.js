const PrimeChecker = require('../prime-checker');
const chai = require('chai');
const errors = require('../errors');

describe('Test Prime Generation', function() {

  it('isPrime function with limit', function() {
    const limit = 13;
    const primeChecker = new PrimeChecker(limit);
    return chai.assert.deepEqual(primeChecker.isPrime(11), true);
  });

  it('isPrime function with wrong limit type', function() {
    const primeChecker = new PrimeChecker('13');
    return chai.assert.throws(() => {
      primeChecker.isPrime(11);
    }, errors.InvalidParameter);
  });

  it('isPrime function without limit', function() {
    const primeChecker = new PrimeChecker();
    return chai.assert.throws(() => {
      primeChecker.isPrime(17);
    }, errors.InvalidParameter);
  });

  it('isPrime function with non-prime number', function() {
    const primeChecker = new PrimeChecker(17);
    return chai.assert.deepEqual(primeChecker.isPrime(10), false);
  });

});
