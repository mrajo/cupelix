.PHONY: watch lint test coverage testall serve

node_modules: package.json
	@yarn

lint:
	@tslint -t codeFrame src/*.ts

test:
	@tape test/*.test.js --data test/data/index.json --auth test/data/auth.json | tap-spec

coverage:
	@nyc tape test/*.test.js --data test/data/index.json --auth test/data/auth.json >/dev/null 2>&1
	@nyc report

testall: node_modules lint test coverage

serve: node_modules
	node src/index.js
