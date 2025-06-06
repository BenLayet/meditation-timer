export const extractBearerToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error(
      `Authorization header is missing or invalid: ${authHeader}`,
    );
  }
  return authHeader.split(" ")[1]; // Extract the token after "Bearer"
};
