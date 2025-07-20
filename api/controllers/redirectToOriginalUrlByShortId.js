const db = require('../db/db');

function redirectToOriginalUrlByShortId(req, res, next) {
  const {
    params: { id },
  } = req;

  if (!id) {
    return next({ error: 'Id is required', statusCode: 403 });
  }

  const stmt = db.prepare('SELECT * FROM url WHERE id = ?').get(id);

  if (!stmt) {
    if (!id) {
      return next({
        error: 'No record found with that id -- please try again',
        statusCode: 404,
      });
    }
  }

  res.redirect(stmt.original_url);
}

module.exports = redirectToOriginalUrlByShortId;
