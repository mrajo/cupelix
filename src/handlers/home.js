'use strict';

module.exports = {
  path: '/',
  methods: {
    get: {
      handler: () => {
        return { data: 'Grittings. Ma nam is Kahlfin.' };
      },
      options: {
        auth: false
      }
    }
  }
};
