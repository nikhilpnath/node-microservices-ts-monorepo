-- Up Migration
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'USERS' CHECK (role IN ('USERS', 'ADMIN')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Down Migration
DROP TABLE IF EXISTS users;
