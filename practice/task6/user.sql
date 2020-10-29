CREATE DATABASE logger;

CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    screenname TEXT NOT NULL
);