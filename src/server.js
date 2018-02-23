'use strict'

const Hapi = require('hapi')
const good = require('good')
const { config, argv } = require('./config')
const loggingOptions = require('./logging')
const { authPlugin, loadAuthDb } = require('./auth')
const routerPlugin = require('./router')
const { SearchIndex, loadIndex } = require('./model')

class Server {
  constructor() {
    this.server = Hapi.Server({
      port: config.port
    })
    this.server.app.config = config
    this.server.app.index = loadIndex(argv)
    this.server.app.users = loadAuthDb(argv)
  }

  async init() {
    // plugins
    try {
      // logging
      await this.server.register({
        plugin: good,
        options: loggingOptions
      })

      // authentication
      await this.server.register(authPlugin)

      // routes must be registered after auth
      await this.server.register(routerPlugin)
    } catch (err) {
      console.log(err);
    }
  }

  async start() {
    try {
      await this.init()
      await this.server.start()
      const cfg = this.server.app.config
      console.log('%s listening on port %d in %s mode...', cfg.appName, cfg.port, cfg.env)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Server
