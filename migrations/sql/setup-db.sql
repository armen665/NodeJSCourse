# setup database

CREATE TABLE migs (
    mig_id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE db_version (
    version INT NOT NULL
);

INSERT INTO db_version (0);

