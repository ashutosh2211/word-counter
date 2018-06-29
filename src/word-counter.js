class WordCounter {

  constructor() {
    this.wordCountMap = {};
    this.maxCount = 0;
  }

  /**
   * Splits a given string into words
   * @param {String} text is the input string
   * @return {Array<String>} Array of words from the given string
   */
  static tokenize(text) {
    let res = [];
    if (text) {
      const regExp = /(\b[^\d\s--]+\b)/g;
      res = text.match(regExp) || [];
    }
    return res;
  }

  /**
   * Updates the maximum word count if current count is higher than previous maximum
   * @param {Number} count is the current count for a word
   */
  updateWordMaxCount(count) {
    this.maxCount = count > this.maxCount ? count : this.maxCount;
  }

  /**
   * Updates the count for each word in a given string
   * @param {String} text is the input string
   */
  count(text) {
    if (!text) {
      return;
    }
    const wordList = WordCounter.tokenize(text.toLowerCase());
    wordList.forEach((word) => {
      if (this.wordCountMap.hasOwnProperty(word)) {
        this.wordCountMap[word] += 1;
      } else {
        this.wordCountMap[word] = 1;
      }
      this.updateWordMaxCount(this.wordCountMap[word]);
    });
  }

  containsVowel(text) {
    if (!text) {
      return False;
    }
    text.forEach(c => {
      return ['a', 'e', 'i', 'o', 'u'].includes(c)
    });
  }

  countVowels(text) {
    if(!text){
      return;
    }
    const wordList = WordCounter.tokenize(text.toLowerCase());

  }

  /**
   * Returns a sorted list of words by count of occurrences and lexicographically if occurrences are equal
   * @return {Array<String>} Sorted array of strings
   */
  getWordsSortedByOccurrence() {
    const wordCountMap = this.wordCountMap;
    return Object.keys(wordCountMap)
      .sort((a, b) => {
        if (wordCountMap[b] !== wordCountMap[a]) {
          return wordCountMap[b] - wordCountMap[a];
        }
        return a > b;
      });
  }

  /**
   * Returns an array of objects with each word and their count
   * @return {Array<String>} Array of words from the given string
   */
  getWordsByOccurrence() {
    let res = [];
    for (let word of this.getWordsSortedByOccurrence()) {
      const count = this.wordCountMap[word];
      const temp = {
        word: word,
        count: count,
      };
      res.push(temp);
    }
    return res;
  }

}

module.exports = WordCounter;
