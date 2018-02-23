'use strict'

const pkg = require('../package.json')
const argv = require('./cli')

const CONFIG_DEFAULTS = {
  appName: pkg.name
}

module.exports = {
  config: Object.assign(CONFIG_DEFAULTS, argv),
  argv: argv
}
