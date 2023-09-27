create table Users(
    id         UUID PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,

    UNIQUE(email)
)