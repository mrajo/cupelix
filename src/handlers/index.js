"use strict";

const homeRoutes = require("./home");
const errorRoutes = require("./error");
const searchRoutes = require("./search");
const userRoutes = require("./user");

module.exports = {
  home: homeRoutes,
  error: errorRoutes,
  search: searchRoutes,
  user: userRoutes
};
