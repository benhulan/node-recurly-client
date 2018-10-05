module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/transactions'
    }
  },

  create: {
    request: {
      method: 'POST',
      uri: '/v2/transactions'
    },
    xml: {root: 'transaction'}
  },

  listByAccount: {
    request: {
      method: 'GET',
      uri: '/v2/accounts/:account_code/transactions'
    }
  },

  get: {
    request: {
      method: 'GET',
      uri: '/v2/transactions/:id'
    }
  },

  refund: {
    request: {
      method: 'DELETE',
      uri: '/v2/transactions/:id'
    }
  }
};
