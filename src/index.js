'use strict'

import { LunrSearchServer } from './server'

// disable elasticlunr warnings
console.warn = null

const app = new LunrSearchServer()
app.start()
