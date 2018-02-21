nodebin = node_modules/.bin/

.PHONY: bundle watch test serve

node_modules: package.json
	@yarn

bundle: node_modules
	@rollup -c

watch: node_modules bundle
	@$(nodebin)supervisor dist/app.js

test: node_modules
	@$(nodebin)mocha -R spec --compilers js:babel-core/register

serve: node_modules
	@node dist/app.js
