const errors = require('./errors');

/**
 * Class to use sieve of Eratosthenes to generate prime numbers and verify if a given number is prime
 * @class Represents a prime number checker.
 */
class Eratosthenes {

  constructor(limit) {
    this.maxLimit = limit;
    this.primes = [];
  }

  /**
   * Returns the primes array till maxLimit and generates it lazily
   * @return {Array<Number>} array of prime numbers upto and including maxLimit
   */
  getPrimes() {
    if (!Array.isArray(this.primes) || !this.primes.length) {
      this.primes = this.generate(this.maxLimit);
    }
    return this.primes;
  }

  /**
   * Returns an array of prime numbers till limit
   * @param {Number} limit the inclusive upper bound for generating prime numbers
   * @return {Array<Number>} array of prime numbers upto and including limit
   */
  generate(limit) {
    let primes = [];
    if (!Number.isInteger(limit)) {
      throw errors.InvalidParameter;
    }
    let sieve = new Array(limit);
    const start = 2;
    Array.from({length: (limit + 1 - start)}, (v, k) => k + start).forEach(test => {
      if (sieve[test]) {
        // NOT PRIME
      } else {
        primes.push(test);
        for (let pm = test; pm < limit + 1; pm += test)
          sieve[pm] = true;
      }
    });
    return primes;
  }

  /**
   * Checks if given number is prime
   * @param {Number} n the number to check if it is prime
   * @return {Boolean} returns true if given input is prime
   */
  isPrime(n) {
    return this.getPrimes().includes(n);
  }

}

module.exports = Eratosthenes;
