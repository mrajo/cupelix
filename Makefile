nodebin = node_modules/.bin/

PHONY: bundle watch test serve

node_modules: package.json
	@yarn

watch: node_modules bundle
	@$(nodebin)supervisor dist/app.js

test: node_modules
	@$(nodebin)tape test/*.js

serve: node_modules
	@node src/index.js
