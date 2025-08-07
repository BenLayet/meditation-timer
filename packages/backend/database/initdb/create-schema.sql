CREATE TABLE IF NOT EXISTS users (
                                     uuid UUID NOT NULL CONSTRAINT users_pkey PRIMARY KEY,
                                     login TEXT NOT NULL UNIQUE,
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
