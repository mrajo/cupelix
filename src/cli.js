'use strict'

import { argv as yargs } from 'yargs'

const ARGV_DEFAULTS = {
  env: 'prod',
  port: 5555,
  auth: 'data/auth.json'
}

export const argv = Object.assign(ARGV_DEFAULTS, yargs)
