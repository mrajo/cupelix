'use strict';

const fs = require('fs-extra');
const bcrypt = require('bcrypt');
const auth_basic = require('hapi-auth-basic');

const loadAuthDb = (argv) => {
  return fs.readJsonSync(argv.auth).users;
};

const validate = async (request, username, password) => {
  const user = request.server.app.users[username];

  if (!user) {
    return { isValid: false, credentials: null };
  }

  const isValid = await bcrypt.compare(password, user.password);
  const credentials = { id: user.id, name: user.name };
  return { isValid, credentials };
};

const authPlugin = {
  name: 'cupelix-authentication',
  version: '1.0.0',
  register: async (server) => {
    try {
      await server.register(auth_basic);
      server.auth.strategy('simple', 'basic', { validate });
      server.auth.default('simple');
      server.log([ 'info', 'startup' ], 'Auth plugin registered.');
    } catch (err) {
      throw err;
    }
  }
};

module.exports = {
  loadAuthDb: loadAuthDb,
  authPlugin: authPlugin
};
