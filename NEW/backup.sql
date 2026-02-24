-- Database Backup
-- Date: 2026-02-22 15:21:22
-- Database: c:/Users/lawre/OneDrive/Desktop/NEW/database.db

CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );

CREATE TABLE sqlite_sequence(name,seq);

