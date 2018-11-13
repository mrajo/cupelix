"use strict";

module.exports = {
  path: "/user",
  methods: {
    get: {
      handler: request => {
        return { data: request.auth };
      },
      options: {
        auth: "simple"
      }
    }
  }
};
