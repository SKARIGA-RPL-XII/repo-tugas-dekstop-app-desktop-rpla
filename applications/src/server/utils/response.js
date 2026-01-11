export const successResponse = (
  res,
  data = null,
  message = "Success",
  statusCode = 200,
  meta = {}
) => {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message,
    data,
    meta: Object.keys(meta).length ? meta : undefined,
  });
};


export const errorResponse = (
  res,
  message = "Internal Server Error",
  statusCode = 500,
  errors = null
) => {
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    errors,
  });
};
