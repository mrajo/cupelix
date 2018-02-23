'use strict'

const elasticlunr = require('elasticlunr')
const fs = require('fs-extra')

const SEARCH_CONFIG_DEFAULTS = {
  fields: {
    title: {
      boost: 2
    },
    contents: {
      boost: 1
    }
  },
  expand: true
}

function SearchIndex(path) {
  if (path != null) {
    fs.readJson(path, (err, data) => {
      if (err) {
        throw new Error(`Cannot load data: ${path}`)
      } else {
        this.index = elasticlunr.Index.load(data)
      }
    })
  } else {
    this.index = elasticlunr(function () {
      this.addField('title')
      this.addField('body')
    })
  }
}

SearchIndex.prototype.save = function (path) {
  fs.writeJson(path, this.index.toJSON(), (err) => {
    console.error(err)
  })
}

SearchIndex.prototype.search = function (query, config) {
  const results = this.index.search(query, Object.assign(SEARCH_CONFIG_DEFAULTS, config))
  let docs = []

  results.forEach((result) => {
    const doc = this.index.documentStore.getDoc(result.ref)
    docs.push({
      score: result.score,
      title: doc.title,
      path: doc.path
    })
  })

  return { data: docs }
}

SearchIndex.prototype.add = function (doc) {
  this.index.addDoc(doc)
}

const loadIndex = (argv) => {
  if (argv.data) {
    try {
      return new SearchIndex(argv.data)
    } catch (e) {
      throw new Error(`Data file not found - ${argv.data}`)
    }
  } else {
    if ([ 'test', 'dev', 'stage', 'prod' ].includes(argv.env)) {
      try {
        return new SearchIndex(`data/_${argv.env}.json`)
      } catch(e) {
        throw new Error(`Data file not found for environment - ${argv.env}`)
      }
    } else {
      throw new Error('Illegal environment value')
    }
  }
  return false
}

module.exports = {
  SearchIndex: SearchIndex,
  loadIndex: loadIndex
}
