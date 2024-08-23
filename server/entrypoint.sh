#!/bin/sh

# Start PostgreSQL service in the background
su postgres -c "pg_ctl -D /var/lib/postgresql/data -l logfile start"

# Wait for PostgreSQL to start
sleep 5

# Run migrations or seed your database if necessary
# su postgres -c "psql -d your_db -f /app/migrations.sql"

# Start the Nest.js application
npm run start:prod

# Keep the container running
tail -f /dev/null
