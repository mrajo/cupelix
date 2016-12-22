'use strict'

export const user_route_map = {
  path: '/user',
  methods: {
    get: {
      handler: (request, reply) => {
        reply({ data: request.auth.credentials })
      },
      config: {
        auth: 'simple'
      }
    }
  }
}
