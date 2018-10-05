var fs = require('fs');

module.exports = {
  transactions: {
    xml: fs.readFileSync(__dirname + '/fixtures/transactions/single.datum.xml'),
    json: require('./fixtures/transactions/single.datum.json')
  }
};