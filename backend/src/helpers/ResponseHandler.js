class ResponseHandler {
  static send(res, statusCode, message, data = {}, token = null) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
      token,
    });
  }
}

export default ResponseHandler;
