nodebin = node_modules/.bin

.PHONY: bundle watch lint test coverage serve

node_modules: package.json
	@yarn

watch: node_modules bundle
	$(nodebin)/supervisor dist/app.js

lint: node_modules
	$(nodebin)/eslint -f tap "src/**/*.js" | $(nodebin)/tap-format-spec
	$(nodebin)/eslint -f tap "scripts/**/*.js" | $(nodebin)/tap-format-spec

test:
	$(nodebin)/tape test/*.js | $(nodebin)/tap-format-spec

coverage:
	$(nodebin)/nyc tape test/test*.js
	$(nodebin)/nyc report --reporter=lcov

serve: node_modules
	@node src/index.js
