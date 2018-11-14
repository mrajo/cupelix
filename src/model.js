"use strict";

const elasticlunr = require("elasticlunr");
const fs = require("fs-extra");

const SEARCH_CONFIG_DEFAULTS = {
  fields: {
    title: {
      boost: 2
    },
    body: {
      boost: 1
    }
  },
  expand: true
};

class SearchIndex {
  constructor(path) {
    this.path = path;
    this.index = null;
  }

  async init() {
    if (this.path != null) {
      const data = await fs.readJson(this.path);
      this.index = elasticlunr.Index.load(data);
    } else {
      this.index = elasticlunr(function () {
        this.addField("title");
        this.addField("body");
      });
    }
  }

  async save() {
    return fs.writeJson(this.path, this.index.toJSON());
  };

  search(query, config) {
    const results = this.index.search(
      query,
      Object.assign(SEARCH_CONFIG_DEFAULTS, config)
    );
    let docs = [];

    results.forEach(result => {
      const doc = this.index.documentStore.getDoc(result.ref);
      docs.push({
        score: result.score,
        title: doc.title,
        path: doc.path
      });
    });

    return { data: docs };
  };

  add(doc) {
    this.index.addDoc(doc);
  };
}

const loadIndex = async argv => {
  let index;

  if (argv.data) {
    try {
      index = new SearchIndex(argv.data);
    } catch (e) {
      throw new Error(`Data file not found - ${argv.data}`);
    }
  } else {
    if (["test", "dev", "stage", "prod"].includes(argv.env)) {
      try {
        index = new SearchIndex(`data/_${argv.env}.json`);
      } catch (e) {
        throw new Error(`Data file not found for environment - ${argv.env}`);
      }
    } else {
      throw new Error("Illegal environment value");
    }
  }

  await index.init();
  return index;
};

module.exports = {
  SearchIndex: SearchIndex,
  loadIndex: loadIndex
};
