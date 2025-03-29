#!/bin/bash
# Create tables in the database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL

    \c $DATABASE_NAME $DATABASE_USER

    CREATE TABLE users (
        uuid UUID NOT NULL CONSTRAINT users_pkey PRIMARY KEY,
        email TEXT,
        created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE devices (
        uuid UUID NOT NULL CONSTRAINT devices_pkey PRIMARY KEY,
        user_uuid UUID NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_user FOREIGN KEY (user_uuid) REFERENCES users (uuid) ON DELETE CASCADE
    );
    CREATE INDEX devices_user_uuid_idx ON devices (user_uuid);

    CREATE TABLE events (
        id SERIAL NOT NULL CONSTRAINT events_pkey PRIMARY KEY,
        device_uuid UUID NOT NULL,
        type TEXT NOT NULL,
        payload JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_device FOREIGN KEY (device_uuid) REFERENCES devices (uuid) ON DELETE CASCADE
    );
    CREATE INDEX events_device_uuid_idx ON events (device_uuid);
    CREATE INDEX events_type_idx ON events (type);
EOSQL

echo "Tables created successfully in database $DATABASE_NAME."