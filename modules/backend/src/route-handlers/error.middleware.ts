export const errorHandler =
  ({ logger }) =>
  //doc express
  // https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling
  // Even if you don’t need to use the next object, you must specify it to maintain the signature
  (error, request, response, next) => {
    // Default error
    logger.error(error);
    response.status(500).json({
      error: `Internal Server Error : ${error.message} `,
    });
  };
