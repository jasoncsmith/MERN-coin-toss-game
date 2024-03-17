const globalErrorHandler = (err, req, res, next) => {
  const { status = 'error', statusCode = 500, message = 'Something went wrong' } = err
  // will catch any error passed to next()
  res.status(statusCode).json({
    status,
    message,
  })
}

export default globalErrorHandler
