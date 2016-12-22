'use strict'

import { home_route_map } from './home'
import { error_route_map } from './error'
import { search_route_map } from './search'
import { user_route_map } from './user'

export const handlers = {
  home: home_route_map,
  error: error_route_map,
  search: search_route_map,
  user: user_route_map
}
