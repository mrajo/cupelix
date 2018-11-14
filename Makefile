.PHONY: watch lint test coverage testall serve

node_modules: package.json
	@yarn

lint: node_modules
	eslint -f tap "src/**/*.js" | tap-spec
	eslint -f tap "scripts/**/*.js" | tap-spec
	eslint -f tap "test/**/*.js" | tap-spec

test:
	tape test/*.test.js | tap-spec

coverage:
	nyc tape test/*.test.js >/dev/null
	nyc report

testall: node_modules lint test coverage

serve: node_modules
	node src/index.js
