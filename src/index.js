'use strict';

const Server = require('./server');

// disable elasticlunr warnings
console.warn = null;

const app = new Server();
app.start();
