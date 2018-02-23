'use strict'

const home_route_map = require('./home')
const error_route_map = require('./error')
const search_route_map = require('./search')
const user_route_map = require('./user')

module.exports = {
  home: home_route_map,
  error: error_route_map,
  search: search_route_map,
  user: user_route_map
}
