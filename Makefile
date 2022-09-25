.PHONY: install-dependencies
install-dependencies:
	@npm install

.PHONY: install
install: install-dependencies

.PHONY: start-dev
start-dev:
	@npm run start:dev:withDocker

.PHONY: unit-tests
unit-tests:
	@npm run test:jest:dev

.PHONY: functional-tests
cucumber-tests:
	@npm run test:cucumber

.PHONY: tests
tests: unit-tests functional-tests
