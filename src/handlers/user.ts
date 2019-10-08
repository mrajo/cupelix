"use strict";

const route: IRoute = {
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

export default route;