module.exports = {
  list: {
    request: {
      method: 'GET',
      uri: '/v2/subscriptions/:uuid/add_ons/:add_on_code/usage'
    }
  },

  lookup: {
    request: {
      method: 'GET',
      uri: '/v2/subscriptions/:uuid/add_ons/:add_on_code/usage/:usage_id'
    },
    xml: { root: 'usage' }
  },

  log: {
    request: {
      method: 'POST',
      uri: '/v2/subscriptions/:uuid/add_ons/:add_on_code/usage'
    }
  },

  update: {
    request: {
      method: 'PUT',
      uri: '/v2/subscriptions/:uuid/add_ons/:add_on_code/usage/:usage_id'
    },
    xml: { root: 'usage' }
  },

  delete: {
    request: {
      method: 'DELETE',
      uri: '/v2/subscriptions/:uuid/add_ons/:add_on_code/usage/:usage_id'
    }
  }
};