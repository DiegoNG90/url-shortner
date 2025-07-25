const db = require('../db/db.js');
const { randomBytes } = require('crypto');

function urlShortnerController(req, res, next) {
  const { url } = req.body;

  console.log('url ??', url);

  if (!url) {
    return next({ error: 'URL is required', statusCode: 400 });
  }

  const shortUrlBase = 'https://shorty.ly';
  const randomId = randomBytes(10).toString('base64url').slice(0, 10);

  console.log('randomId', randomId);

  const stmt = db.prepare(`
    INSERT INTO url (id, original_url)
    VALUES (?, ?)`);

  stmt.run(randomId, url);

  res.json({ id: randomId, shortUrl: `${shortUrlBase}/${randomId}` });
}

module.exports = urlShortnerController;
