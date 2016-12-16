'use strict'

import { argv as yargs } from 'yargs'

const ARGV_DEFAULTS = {
  env: 'prod',
  port: 5555
}

export const argv = Object.assign(ARGV_DEFAULTS, yargs)
