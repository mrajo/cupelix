'use strict'

module.exports = {
  path: '/',
  methods: {
    get: (request, h) => {
      return { data: 'Grittings. Ma nam is Kahlfin.' }
    }
  }
}
