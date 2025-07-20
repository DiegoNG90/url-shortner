const db = require('../db/db.js');
const { randomBytes } = require('crypto');

function urlShortnerController(req, res, next) {
  const { url } = req.body;

  if (!url) {
    return next({ error: 'URL is required', statusCode: 400 });
  }

  const shortUrlBase = 'https://shorty.ly';
  const randomId = randomBytes(10).toString('base64url').slice(0, 10);

  console.log('randomId', randomId);

  const stmt = db.prepare(`
    INSERT INTO url (original_url, short_url, short_url_id)
    VALUES (?, ?, ?)`);

  const { lastInsertRowid } = stmt.run(
    url,
    `${shortUrlBase}/${randomId}`,
    randomId
  );

  const insertedRecord = db
    .prepare('SELECT * FROM url WHERE id = ?')
    .get(lastInsertRowid);

  res.json(insertedRecord);
}

module.exports = urlShortnerController;
