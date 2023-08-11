#!/bin/bash

# Build TypeScript code
tsc src/cli.ts

# Set execute permissions for the executable
chmod +x src/cli.js

# Install the CLI globally
npm i -g