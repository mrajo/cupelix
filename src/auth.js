'use strict'

const fs = require('fs-extra')
const bcrypt = require('bcryptjs')
const auth_basic = require('hapi-auth-basic')
const argv = require('./cli')

const loadAuthDb = (argv) => {
  return fs.readJsonSync(argv.auth).users
}

const validate = async (request, username, password, h) => {
  const user = request.server.app.users[username]

  if (!user) {
      return { credentials: null, isValid: false }
  }

  bcrypt.compare(password, user.password, (err, isMatched) => {
    const credentials = { id: user.id, name: user.name };
    return { isMatched, credentials }
  })
}

const authPlugin = {
  name: 'CupelixAuthentication',
  version: '1.0.0',
  register: async (server, options) => {
    try {
      await server.register(auth_basic)
      server.auth.strategy('simple', 'basic', { validate })
      server.log([ 'info', 'startup' ], 'Auth plugin registered.')
    } catch (err) {
      throw err
    }
  }
}

module.exports = {
  loadAuthDb: loadAuthDb,
  authPlugin: authPlugin
}
