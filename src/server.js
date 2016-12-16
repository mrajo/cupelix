'use strict';

import * as Hapi from 'hapi'
import config from './config'
import { argv } from './cli'
// import { router } from './router'
// import { SearchIndex, load_index } from './models'
// import { logger, errorLogger } from './logger'

const server = new Hapi.Server()

server.app.config = Object.assign(config, argv)
//server.app.index = load_index(argv)
server.connection({ port: config.port })

// needs routes

export const start = () => {
  server.start((err) => {
    if (err) throw err
    const cfg = server.app.config
    console.log('%s listening on port %d in %s mode...', cfg.appName, cfg.port, cfg.env)
  })
}
