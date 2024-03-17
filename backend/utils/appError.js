class AppError extends Error {
  constructor(message, statusCode = '') {
    super(message)

    this.status = ('' + statusCode).startsWith('4') ? 'fail' : 'error'
    this.statusCode = statusCode
    this.isCustomError = true

    // not sure i need captureStackTrace
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
