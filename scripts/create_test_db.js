const elasticlunr = require('elasticlunr');
const fs = require('fs-extra');

const index = elasticlunr(function () {
  this.addField('title');
  this.addField('body');
  this.setRef('id');
});

const docs = fs.readJsonSync('data/_docs.json').data;

docs.forEach(function (doc) {
  index.addDoc(doc);
});

fs.writeJsonSync('data/_index.json', index.toJSON());
