function errorHandler(err, req, res, next) {
  switch (true) {
    case typeof err === 'string':
      // custom application error
      const is404 = err.toLowerCase().endsWith('not found')
      const statusCode = is404 ? 404 : 400
      return res.status(statusCode).json({ message: err })
    case err.name === 'UnauthorizedError':
      // jwt authentication error
      return res.status(401).json({ message: 'Unauthorized' })
    default:
      const status = err?.statusCode ?? 500
      const message = err?.details?.message ?? err.message
      return res.status(status).json({ message })
  }
}

export default errorHandler
