"use strict";

const route: IRoute = {
  path: "/error",
  methods: {
    get: {
      handler: (request, h) => {
        const error = {
          code: 500,
          message: "Generic error"
        };
        request.log(["error"], error);
        return h.response({ error: error.message }).code(error.code);
      },
      options: {
        auth: false
      }
    }
  }
};

export default route;