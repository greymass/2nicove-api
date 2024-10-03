SHELL := /bin/bash
TEST_FILES := $(shell find src -name '*.ts')
BIN := ./node_modules/.bin

.PHONY: dev
dev:
	bun run --watch src/index.ts

.PHONY: build
build: node_modules codegen 
	bun build --compile --minify-whitespace --minify-syntax --target bun --outfile 2nicove-api ./src/index.ts

.PHONY: test
test: build node_modules build/drops.ts build/epoch.drops.ts init/codegen
	bun test

codegen: codegen/dir build/eosio.token.ts

build/eosio.token.ts: 
	bunx @wharfkit/cli generate --url https://eos.greymass.com --file ./src/contracts/eosio.token.ts eosio.token

codegen/dir:
	mkdir -p codegen

.PHONY: check
check: node_modules
	@${BIN}/eslint src --ext .ts --max-warnings 0 --format unix && echo "Ok"

.PHONY: format
format: node_modules
	@${BIN}/eslint src --ext .ts --fix

.PHONY: distclean
distclean: clean
	rm -rf node_modules/

node_modules:
	bun install
