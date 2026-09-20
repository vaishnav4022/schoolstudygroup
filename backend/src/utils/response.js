const successResponse = (res, message = '', data = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, statusCode = 500, message = 'Internal Server Error', error = {}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export { successResponse, errorResponse };
