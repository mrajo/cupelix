'use strict'

export const loggingOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [ { log: '*', response: '*' } ]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ],
    fileReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [ { ops: '*' } ]
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson'
      },
      {
        module: 'good-file',
        args: [ './logs/server.log' ]
      }
    ]
  }
};
