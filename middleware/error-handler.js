const errorHandlerMiddleware = (err, req, res, next) => {
  let errorObject = {
    code: err.code || 500,
    message: err.message || 'internal server error',
  }
  return res.status(errorObject.code).json({ return: true, msg: errorObject.message })
}
module.exports = errorHandlerMiddleware