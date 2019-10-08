"use strict";

const Hapi = require("hapi");
const good = require("good");
const { config, argv } = require("./config");
const loggingOptions = require("./logging");
const { authPlugin, loadAuthDb } = require("./auth");
const routerPlugin = require("./router");
const { loadIndex } = require("./model");

class Server {
  constructor() {
    this.server = Hapi.Server({
      port: config.port
    });
    this.server.app.config = config;
    this.server.app.users = loadAuthDb(argv);
  }

  get hapi() {
    return this.server;
  }

  async init(silent = false) {
    // load search index
    this.server.app.index = await loadIndex(argv);

    // plugins
    try {
      // logging
      if (!silent) {
        await this.server.register({
          plugin: good,
          options: loggingOptions
        });
      }

      // authentication
      await this.server.register({ plugin: authPlugin });

      // routes must be registered after auth
      await this.server.register({ plugin: routerPlugin });
    } catch (err) {
      console.log(err);
    }
  }

  async start() {
    try {
      await this.init();
      await this.server.start();
      const cfg = this.server.app.config;
      console.log(
        "%s listening on port %d in %s mode...",
        cfg.appName,
        cfg.port,
        cfg.env
      );
    } catch (err) {
      console.log(err);
    }
  }

  async simRequest(injectOptions) {
    return this.server.inject(injectOptions);
  }
}

module.exports = Server;
