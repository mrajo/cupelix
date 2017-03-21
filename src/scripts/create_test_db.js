var elasticlunr = require('elasticlunr')
var fs = require('fs-extra')

var index = elasticlunr(function () {
    this.addField('title')
    this.addField('body')
    this.setRef('id')
});

var docs = fs.readJsonSync('data/_docs.json').data

docs.forEach(function (doc) {
  index.addDoc(doc)
})

fs.writeJsonSync('data/_index.json', index.toJSON())
