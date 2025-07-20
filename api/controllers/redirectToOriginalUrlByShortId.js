const db = require('../db/db');

function redirectToOriginalUrlByShortId(req, res, next) {
  const {
    params: { id },
  } = req;

  if (!id) {
    return next({ error: 'Id is required', statusCode: 403 });
  }

  const stmt = db.prepare('SELECT * FROM url WHERE short_url_id = ?').get(id);

  res.redirect(stmt.original_url);
}

module.exports = redirectToOriginalUrlByShortId;
