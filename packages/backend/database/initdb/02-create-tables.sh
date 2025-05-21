#!/bin/bash
# Create tables in the database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL

    \c $DATABASE_NAME $DATABASE_USER

    CREATE TABLE IF NOT EXISTS users (
        uuid UUID NOT NULL CONSTRAINT users_pkey PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL NOT NULL CONSTRAINT events_pkey PRIMARY KEY,
        uuid UUID NOT NULL UNIQUE,
        user_uuid UUID NOT NULL,
        type TEXT NOT NULL,
        payload JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_user FOREIGN KEY (user_uuid) REFERENCES users (uuid) ON DELETE CASCADE
    );
    CREATE INDEX events_user_uuid_idx ON events (user_uuid);
    CREATE INDEX events_type_idx ON events (type);
    
    CREATE TABLE IF NOT EXISTS email_verifications (
        uuid UUID NOT NULL CONSTRAINT email_verifications_pkey PRIMARY KEY,
        email TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        status TEXT NOT NULL
    );
EOSQL

echo "Tables created successfully in database $DATABASE_NAME."