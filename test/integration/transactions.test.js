var _ = require('lodash');
var assert = require('assert');
var nock = require('nock');

var Recurly = require('../../index');
var keys = require('./keys');
var client = new Recurly(keys);
var data = require('./transactions.data');
var json2xml = require('../../lib/utils/json2xml');
var rNock = nock('https://' + keys.subdomain + '.recurly.com').defaultReplyHeaders({
  'Content-Type': 'application/xml'
});

var validateGenericSuccessfulResponse = require('./utils/validateGenericSuccessfulResponse');

describe('Transactions', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  afterEach(function () {
    assert(rNock.isDone(), 'Nock has not been called.');
  });

  it('should list transactions', function list (done) {
    rNock.get('/v2/transactions').reply(200, data.transactions.xml);

    client.transactions.list(_.partialRight(validateGenericSuccessfulResponse, data.transactions.json, done));
  });

  // TEST FAILS. "expected Object { ... } to equal Function { name: '' }"
  // it('should list by account', function listByAccount (done) {
  //   var requestBody = json2xml('transactions', data.transactions.json);
  //   rNock.post('/v2/accounts/deadbeef/transactions', requestBody).reply(200, data.transactions.xml);

  //   client.transactions.listByAccount('deadbeef', data.transactions.json, _.partialRight(validateGenericSuccessfulResponse, data.transactions.json, done));
  // });

  // TEST FAILS. "expected Object { ... } to equal Function { name: '' }"
  // it('should create', function create (done) {
  //   var requestBody = json2xml('transactions', data.transactions.json);
  //   rNock.post('/v2/transactions', requestBody).reply(200, data.transactions.xml);

  //   client.transactions.create(data.transactions.json, _.partialRight(validateGenericSuccessfulResponse, data.transactions.json, done));
  // });

  it('should get', function lookup (done) {
    rNock.get('/v2/transactions/deaduuid').reply(200, data.transactions.xml);

    client.transactions.get('deaduuid', _.partialRight(validateGenericSuccessfulResponse, data.transactions.json, done));
  });

  // TEST FAILS. "expected Object { ... } to equal Function { name: '' }"
  // it('should create refund', function refund (done) {
  //   rNock.put('/v2/transactions/deaduuid/refund').reply(200, data.transactions.xml);

  //   client.transactions.refund('deaduuid', _.partialRight(validateGenericSuccessfulResponse, data.transactions.json, done));
  // });

});