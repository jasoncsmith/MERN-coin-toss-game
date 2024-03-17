const catchAsyncError = fn => (res, req, next) => fn(res, req, next).catch(err => next(err))

export default catchAsyncError
