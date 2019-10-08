"use strict";

const handlers = require("../handlers/");

const setRoutes = (server, handlers) => {
  Object.keys(handlers).forEach(map => {
    Object.keys(handlers[map].methods).forEach(method => {
      server.log(
        ["info", "startup"],
        `Setting route at ${method.toUpperCase()} ${handlers[map].path}`
      );

      if (typeof handlers[map].methods[method] === "function") {
        server.route({
          method: method,
          path: handlers[map].path,
          handler: handlers[map].methods[method]
        });
      } else {
        server.route({
          method: method,
          path: handlers[map].path,
          handler: handlers[map].methods[method].handler,
          options: handlers[map].methods[method].options
        });
      }
    });
  });
};

export const RouterPlugin = {
  name: "cupelix-router",
  version: "1.0.0",
  register: async (server, options) => {
    setRoutes(server, handlers);
    server.log(["info", "startup"], "Router plugin registered.");
  }
};