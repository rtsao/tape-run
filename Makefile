build:
	@node_modules/.bin/browserify browser/extract-coverage.js -o static/extract-coverage.js

test:
	@node_modules/.bin/tape test/*.js

.PHONY: test

