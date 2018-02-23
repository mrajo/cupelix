'use strict'

module.exports = {
  path: '/user',
  methods: {
    get: {
      handler: (request, h) => {
        return { data: request.auth.credentials }
      },
      config: {
        auth: 'simple'
      }
    }
  }
}
