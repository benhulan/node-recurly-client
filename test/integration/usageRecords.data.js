var fs = require('fs');

module.exports = {
  usageRecords: {
    xml: fs.readFileSync(__dirname + '/fixtures/usageRecords/single.datum.xml'),
    json: require('./fixtures/usageRecords/single.datum.json')
  },
  usageRecordsList: {
    xml: fs.readFileSync(__dirname + '/fixtures/usageRecords/list.datum.xml'),
    json: require('./fixtures/usageRecords/list.datum.json')
  },
};
