"use strict";

const Server = require("./server");

// disable elasticlunr warnings
console.warn = null;

(async () => {
  const app = new Server();
  await app.start();
})();
