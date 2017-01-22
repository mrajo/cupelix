'use strict'

export const search_route_map = {
  path: '/search',
  methods: {
    get: (request, reply) => {
      reply().code(204)
    },
    post: {
      handler: (request, reply) => {
        const index = request.server.app.index
        reply(index.search(request.payload.q, JSON.parse(request.payload.config)))
      },
      config: {
        auth: 'simple',
        cors: true
      }
    }
  }
}
