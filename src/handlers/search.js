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
        let config = request.payload.config

        if (typeof config == 'string') {
          config = JSON.parse(config)
        }

        reply(index.search(request.payload.q, config))
      },
      config: {
        auth: 'simple',
        cors: true
      }
    }
  }
}
