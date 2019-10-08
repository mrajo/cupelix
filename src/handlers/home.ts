"use strict";

const pkg = require("../../package.json");

const route: IRoute = {
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

export default route;