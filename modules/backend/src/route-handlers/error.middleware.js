export const errorHandler =
  ({ logger }) =>
  (error, request, response) => {
    // Default error
    logger.error(error);
    response.status(500).json({
      error: `Internal Server Error : ${error.message} `,
    });
  };
