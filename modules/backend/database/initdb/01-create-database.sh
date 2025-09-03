#!/bin/bash
# Create the user and database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER $DATABASE_USER WITH PASSWORD '$DATABASE_PASSWORD';
    CREATE DATABASE $DATABASE_NAME OWNER $DATABASE_USER;
EOSQL

echo "Database $DATABASE_NAME and user $DATABASE_USER created successfully."