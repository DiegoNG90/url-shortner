const sql = require('better-sqlite3');

const db = sql('url-shortner.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS url (
    id INTEGER PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;
