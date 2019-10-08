"use strict";

const yargs = require("yargs").argv;

const ARGV_DEFAULTS = {
  env: "prod",
  port: 5555,
  auth: "data/prod_auth.json",
  data: "data/prod_index.json"
};

let argvUser = {};

if (yargs.env) {
  argvUser.auth = `data/${yargs.env}_auth.json`;
  argvUser.data = `data/${yargs.env}_index.json`;
}

const argv = Object.assign(ARGV_DEFAULTS, argvUser, yargs);

module.exports = argv;
