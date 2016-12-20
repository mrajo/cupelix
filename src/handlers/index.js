'use strict'

import { home_route_map } from './home'
import { error_route_map } from './error'
import { search_route_map } from './search'

export const handlers = {
  home: home_route_map,
  error: error_route_map,
  search: search_route_map
}
