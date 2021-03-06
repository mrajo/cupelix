'use strict';

import * as Hapi from 'hapi'
import * as good from 'good'
import config from './config'
import { argv } from './cli'
import { loggingOptions } from './logging'
import { auth, loadAuthDb } from './auth'
import { router } from './router'
import { SearchIndex, loadIndex } from './model'

export function Server() {
  this.server = new Hapi.Server()
  this.server.app.config = Object.assign(config, argv)
  this.server.app.index = loadIndex(argv)
  this.server.app.users = loadAuthDb(argv)
  this.server.connection({ port: config.port })

  // plugins
  this.server.register({
    register: good,
    options: loggingOptions
  }, (err) => {
    if (err) {
      throw err
    }
  })

  // authentication
  this.server.register(auth, (err) => {
    if (err) {
      throw err
    }

    // routes must be registered after auth
    this.server.register(router, (err) => {
      if (err) {
        throw err
      }
    })
  })
}

Server.prototype.start = function () {
  this.server.start((err) => {
    if (err) throw err
    const cfg = this.server.app.config
    console.log('%s listening on port %d in %s mode...', cfg.appName, cfg.port, cfg.env)
  })
}
