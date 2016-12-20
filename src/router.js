'use strict'

import { handlers } from './handlers/index'

const setRoutes = (server, handlers) => {
  Object.keys(handlers).forEach((map) => {
    Object.keys(handlers[map].methods).forEach((method) => {
      server.log([ 'info', 'startup' ], `Setting route at ${method.toUpperCase()} ${handlers[map].path}`)
      server.route({
        method: method,
        path: handlers[map].path,
        handler: handlers[map].methods[method]
      })
    })
  })
}

export const router = {
  register: (server, options, next) => {
    setRoutes(server, handlers)
    next()
  }
}

router.register.attributes = {
  name: 'LunrSearchServerRouter',
  version: '1.0.0'
}
