'use strict';

import * as Hapi from 'hapi'
//import { good } from 'good'
import config from './config'
import { argv } from './cli'
import { loggingOptions } from './logging'
// import { router } from './router'
// import { SearchIndex, load_index } from './models'
// import { logger, errorLogger } from './logger'

export function LunrSearchServer() {
  this.server = new Hapi.Server()
  this.server.app.config = Object.assign(config, argv)
  //this.server.app.index = load_index(argv)
  this.server.connection({ port: config.port })

  // plugins
  this.server.register({
    // is it possible to not use require?
    register: require('good'),
    options: loggingOptions
  }, (err) => {
    if (err) {
      throw err
    }
  })

  // routes
}

LunrSearchServer.prototype.start = function () {
  this.server.start((err) => {
    if (err) throw err
    const cfg = this.server.app.config
    console.log('%s listening on port %d in %s mode...', cfg.appName, cfg.port, cfg.env)
  })
}
