.PHONY: setup start

SHELL := /bin/bash

include config.env
export SHELL_INIT_FILE

setup:
	source $(SHELL_INIT_FILE) && nvm use 16.20.0 && npm i forever --save && alias forever='./node_modules/forever/bin/forever'
