class ServerSideResponse {
  constructor(clientSideResponse) {
    this.clientSideResponse = clientSideResponse;
  }
  status = (status) => {
    this.clientSideResponse.status = status;
    return this;
  };
  json = (json) => {
    this.clientSideResponse.body = json;
    return this;
  };
}
export const createFakeEndPoint =
  (handler) =>
  async ({ params = {}, query = {}, headers = {}, body = {} }) => {
    const clientSideResponse = {};
    await handler(
      { params, query, headers, body },
      new ServerSideResponse(clientSideResponse),
    );
    return clientSideResponse;
  };
