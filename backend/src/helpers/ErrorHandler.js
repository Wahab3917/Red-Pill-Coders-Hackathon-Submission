class ErrorHandler {
  static send(res, statusCode, error) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      error,
    });
  }
}

export default ErrorHandler;
