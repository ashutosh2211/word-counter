const PrimeChecker = require('../prime-checker');
const chai = require('chai');
const errors = require('../errors');

describe('Test Prime Generation', function() {

  it('generate function with limit', function() {
    const limit = 13;
    const primeChecker = new PrimeChecker(limit);
    return chai.expect(primeChecker.isPrime(11))
      .deep.equal(true);
  });

  it('generate function without limit', function() {
    const primeChecker = new PrimeChecker();
    return chai.expect(() => {
      primeChecker.isPrime(17);
    }).to.throw(errors.InvalidParameter);
  });

});
