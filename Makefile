.PHONY: watch lint test coverage testall serve

node_modules: package.json
	@yarn

watch: node_modules bundle
	supervisor dist/app.js

lint: node_modules
	eslint -f tap "src/**/*.js" | tap-format-spec
	eslint -f tap "scripts/**/*.js" | tap-format-spec

test:
	tape test/*.js | tap-format-spec

coverage:
	nyc tape test/test*.js
	nyc report --reporter=lcov

testall: node_modules lint test coverage

serve: node_modules
	node src/index.js
