'use strict'

import { handlers } from './handlers/index'

const setRoutes = (server, handlers) => {
  Object.keys(handlers).forEach((map) => {
    Object.keys(handlers[map].methods).forEach((method) => {
      server.log([ 'info', 'startup' ], `Setting route at ${method.toUpperCase()} ${handlers[map].path}`)

      if (typeof handlers[map].methods[method] == 'function') {
        server.route({
          method: method,
          path: handlers[map].path,
          handler: handlers[map].methods[method]
        })
      } else {
        server.route({
          method: method,
          path: handlers[map].path,
          handler: handlers[map].methods[method].handler,
          config: handlers[map].methods[method].config
        })
      }
    })
  })
}

export const router = {
  register: (server, options, next) => {
    setRoutes(server, handlers)
    server.log([ 'info', 'startup' ], 'Router plugin registered.')
    next()
  }
}

router.register.attributes = {
  name: 'LunrSearchServerRouter',
  version: '1.0.0'
}
