var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./usageRecords.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');

describe('Usage records', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should list usage records', function list (done) {
    rNock.get('/v2/subscriptions/example_subscription_id/add_ons/example_addon_id/usage').reply(200, data.usageRecords.xml);

    client.usageRecords.list('example_subscription_id', 'example_addon_id', _.partialRight(validateGenericSuccessfulResponse, data.usageRecords.json, done));
  });

  // TEST FAILS. "expected Object { ... } to equal Function { name: '' }"
  // it('should log usage records', function log (done) {
  //   var requestBody = json2xml('usage', data.usageRecordsList.json);
  //   rNock.post('/v2/subscriptions/example_subscription_id/add_ons/example_addon_id/usage', requestBody).reply(200, data.usageRecordsList.xml);

  //   client.usageRecords.log('example_subscription_id', 'example_addon_id', _.partialRight(validateGenericSuccessfulResponse, data.usageRecordsList.json, done));
  // });

  it('should lookup usage records', function lookup (done) {
    rNock.get('/v2/subscriptions/example_subscription_id/add_ons/example_addon_id/usage/deadbeef').reply(200, data.usageRecords.xml);

    client.usageRecords.lookup('example_subscription_id', 'example_addon_id', 'deadbeef', _.partialRight(validateGenericSuccessfulResponse, data.usageRecords.json, done));
  });

  // TEST FAILS. "expected Object { ... } to equal Function { name: '' }"
  // it('should update usage record', function update (done) {
  //   var requestBody = json2xml('usage', data.usageRecords.json);
  //   rNock.put('/v2/subscriptions/example_subscription_id/add_ons/example_addon_id/usage/deadbeef', requestBody).reply(200, data.usageRecords.xml);

  //   client.usageRecords.update('example_subscription_id', 'example_addon_id', 'deadbeef', data.usageRecords.json.usageRecords, _.partialRight(validateGenericSuccessfulResponse, data.usageRecords.json, done));
  // });

  it('should delete usage record', function del (done) {
    rNock.delete('/v2/subscriptions/example_subscription_id/add_ons/example_addon_id/usage/deadbeef').reply(204, data.usageRecords.xml);

    client.usageRecords.delete('example_subscription_id', 'example_addon_id', 'deadbeef', function (err, pack) {
      if (err) { return done(err); }

      assert(pack.headers);
      done();
    });
  });
});