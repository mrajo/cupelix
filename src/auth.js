'use strict'

import fs from 'fs-extra'
import * as bcrypt from 'bcryptjs'
import * as auth_basic from 'hapi-auth-basic'
import { argv } from './cli'

export const loadAuthDb = (argv) => {
  return fs.readJsonSync(argv.auth).users
}

const validate = (request, username, password, callback) => {
  const user = request.server.app.users[username]

  if (!user) {
      return callback(null, false)
  }

  bcrypt.compare(password, user.password, (err, isMatched) => {
    callback(err, isMatched, { id: user.id, name: user.name })
  })
}

export const auth = {
  register: (server, options, next) => {
    server.register(auth_basic, (err) => {
      if (err) {
        throw err
      }

      server.auth.strategy('simple', 'basic', { validateFunc: validate })
      server.log([ 'info', 'startup' ], 'Auth plugin registered.')
      next()
    })
  }
}

auth.register.attributes = {
  name: 'CupelixAuthentication',
  version: '1.0.0'
}
