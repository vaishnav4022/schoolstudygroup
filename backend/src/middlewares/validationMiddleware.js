const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: error.errors || error.message,
    });
  }
};

export default validationMiddleware;
