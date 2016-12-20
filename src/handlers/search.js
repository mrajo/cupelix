'use strict'

export const search_route_map = {
  path: '/search',
  methods: {
    get: (request, reply) => {
      reply({ data: 'search' })
    }
  }
}
