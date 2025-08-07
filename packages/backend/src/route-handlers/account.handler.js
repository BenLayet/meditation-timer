export const createAccountHandler =
  ({ createAccountUsecase }) =>
  async (request, response) => {
    const { login } = request.body;
    const account = await createAccountUsecase(login);
    response.status(201).json(account);
  };

export const loginHandler =
  ({ loginUsecase }) =>
  async (request, response) => {
    const { login } = request.query;
    const account = await loginUsecase(login);
    response.status(200).json(account);
  };
