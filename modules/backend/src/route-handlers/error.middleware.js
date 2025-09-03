export const errorHandler =
  ({ logger }) =>
  (request, response, error) => {
    // Default error
    logger.error(request);
    logger.error(response);
    logger.error(error);
    response.status(500).json({
      error: `Internal Server Error : ${error.message} `,
    });
  };
