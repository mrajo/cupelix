'use strict'

const yargs = require('yargs').argv

const ARGV_DEFAULTS = {
  env: 'prod',
  port: 5555,
  auth: 'data/prod_auth.json',
  data: 'data/prod_index.json'
}

let argv_user = {}

if (yargs.env) {
  argv_user.auth = `data/${yargs.env}_auth.json`
  argv_user.data = `data/${yargs.env}_index.json`
}

const argv = Object.assign(ARGV_DEFAULTS, argv_user, yargs)

module.exports = argv
