nodebin = node_modules/.bin/

node_modules: package.json
	@yarn

bundle: node_modules
	@rollup -c

watch: node_modules bundle
	@$(nodebin)supervisor dist/app.js

test: node_modules
	@$(nodebin)mocha -R spec

serve: node_modules
	@node dist/app.js
