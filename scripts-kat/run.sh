#!/bin/bash

# Install forever package
npm i forever

# Create alias for forever command
alias forever='./node_modules/forever/bin/forever'

# Start the app.js file using forever
forever start app.js &
