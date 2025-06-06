export const healthCheckHandler = ({ healthCheck }) => {
  return async (request, response) => {
    response.status(200).json(await healthCheck());
  };
};
