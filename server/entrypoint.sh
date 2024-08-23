#!/bin/sh

# Start the Nest.js application
npm run start:prod

# Keep the container running
tail -f /dev/null
