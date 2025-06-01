const { ValidationError, BaseError } = require('sequelize');

module.exports.dbErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    console.log('Validation', err);

    const errors = err.errors.map((e) => ({ status: 422, title: e.message }));
    return res.status(422).send(errors);
  } else if (err instanceof BaseError) {
    return res.status(500).send([
      {
        status: 500,
        title: 'Database Error',
      },
    ]);
  }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status || 500;
  const message = err.message || 'Server Error';

  res.status(status).send([{ status, message }]);
};
