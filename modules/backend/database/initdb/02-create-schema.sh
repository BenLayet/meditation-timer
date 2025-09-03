#!/bin/bash
# Create tables in the database
psql -v ON_ERROR_STOP=1 -U $DATABASE_USER -d $DATABASE_NAME -f /docker-entrypoint-initdb.d/create-schema.sql &&
echo "Tables created successfully in database $DATABASE_NAME."