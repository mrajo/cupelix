'use strict'

export const home_route_map = {
  path: '/',
  methods: {
    get: (request, reply) => {
      reply({ data: 'Grittings. Ma nam is Kahlfin.' })
    }
  }
}
