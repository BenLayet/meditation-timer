export const errorHandler =
  ({ logger }) =>
  (request, response, next, error) => {
    // Default error
    logger.error(error);
    response.status(500).json({
      error: `Internal Server Error : ${error.message} `,
    });
  };
