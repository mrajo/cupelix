'use strict'

export const error_route_map = {
  path: '/error',
  methods: {
    get: (request, reply) => {
      const error = {
        code: 500,
        message: 'Generic error',
      }
      request.log(['error'], error)
      reply({ error: error.message }).code(error.code)
    }
  }
}
