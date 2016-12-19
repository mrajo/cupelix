'use strict'

export const loggingOptions = {
  ops: {
    interval: 10000
  },
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [
          {
            log: '*',
            response: '*'
          }
        ]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ],
    opsFileReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [
          {
            ops: '*'
          }
        ]
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson'
      },
      {
        module: 'good-file',
        args: [ './logs/ops.log' ]
      }
    ],
    errorFileReport: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [
          {
            error: '*',
            request: 'error'
          }
        ]
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson'
      },
      {
        module: 'good-file',
        args: [ './logs/error.log' ]
      }
    ],
    trafficFileReport: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [
          {
            request: '*',
            response: {
              exclude: 'error'
            }
          }
        ]
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson'
      },
      {
        module: 'good-file',
        args: [ './logs/traffic.log' ]
      }
    ],
    serverFileReport: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [
          {
            log: '*'
          }
        ]
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
