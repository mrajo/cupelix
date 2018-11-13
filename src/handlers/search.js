"use strict";

module.exports = {
  path: "/search",
  methods: {
    get: (request, h) => {
      return h.response().code(204);
    },
    post: {
      handler: request => {
        const index = request.server.app.index;
        let config = request.payload.config;

        if (typeof config === "string") {
          config = JSON.parse(config);
        }

        return index.search(request.payload.q, config);
      },
      options: {
        auth: "simple",
        cors: true
      }
    }
  }
};
