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
  async (params = {}, body = {}, headers = {}) => {
    const clientSideResponse = {};
    await handler(
      { body, headers, params },
      new ServerSideResponse(clientSideResponse),
    );
    return clientSideResponse;
  };
