function handleErrorMiddleware(err, req, res, next) {
  const defaultErrorStatusCode = 500;

  res.status(err?.statusCode || defaultErrorStatusCode).send(err);
}

module.exports = handleErrorMiddleware;
