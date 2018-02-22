nodebin = node_modules/.bin/

node_modules: package.json
	@yarn

bundle: node_modules
	@rollup -c

watch: node_modules bundle
	@$(nodebin)supervisor dist/app.js

test: node_modules
	@$(nodebin)babel-tape-runner test/*.js

serve: node_modules
	@node dist/app.js
