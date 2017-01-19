'use strict'

import { Server } from './server'

// disable elasticlunr warnings
console.warn = null

const app = new Server()
app.start()
