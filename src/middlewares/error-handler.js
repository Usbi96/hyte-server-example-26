import {validationResult} from 'express-validator';

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Bad Request');
    error.status = 400;
    error.errors = errors.array({onlyFirstError: true}).map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return next(error);
  }

  next();
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
      errors: err.errors || '',
    },
  });
};

export {validationErrorHandler, notFoundHandler, errorHandler};
