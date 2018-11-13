"use strict";

const pkg = require("../../package.json");

module.exports = {
  path: "/",
  methods: {
    get: {
      handler: () => {
        return { data: `${pkg.name} v${pkg.version}` };
      },
      options: {
        auth: false
      }
    }
  }
};
