const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.orignalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = async (err, req, res, next) => {
  let statusCode = res.status === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not Found";
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
