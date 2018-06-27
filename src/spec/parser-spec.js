const chai = require('chai');
const cliArgsParser = require('../parser').getInstance();

describe('Test Parser', function() {

  it('cli args parser test filePath present', function() {
    const command = 'node src/cli.js files/Railway-Children-by-E-Nesbit';
    const args = command.split(' ');
    return chai.expect(cliArgsParser.parse(args))
      .to.deep.equal({
        filePath: 'files/Railway-Children-by-E-Nesbit',
        commandArgs: [],
      });
  });

  it('cli args parser test filePath absent', function() {
    const command = 'node src/cli.js';
    const args = command.split(' ');
    return chai.expect(cliArgsParser.parse(args))
      .to.deep.equal({
        filePath: undefined,
        commandArgs: [],
      });
  });

});
