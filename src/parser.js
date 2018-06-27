/**
 * Class to parse command line arguments
 * @class CliParamParser parses sys.argv and returns parameters
 */
class CliParamParser {

  constructor() {
    this.filePathIndex = 2;
  }

  /**
   * Returns the filePath and addition command arguments from args
   * @param {Array} args is an array of command line arguments
   * @return {Object} Object containing the filePath and additional command arguments
   */
  parse(args) {
    let filePath = args[this.filePathIndex];
    let commandArgs = args.slice(this.filePathIndex + 1);
    return {
      filePath: filePath,
      commandArgs: commandArgs,
    };
  }

}

let instance;

module.exports = {
  getInstance: () => {
    if (!instance) {
      instance = new CliParamParser();
    }
    return instance;
  },
};
