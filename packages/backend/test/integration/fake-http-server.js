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
  setHeader(headerName, headerValue) {
    this.clientSideResponse.headers[headerName] = headerValue;
    return this;
  }
}
class ServerSideRequest {
  constructor({ params, query, headers, body }) {
    this.params = params;
    this.query = query;
    this.headers = headers;
    this.body = body;
  }
  getHeader = (headerName) => {
    return this.headers[headerName];
  };
}
export const createFakeEndPoint =
  (handler) =>
  async ({ params = {}, query = {}, headers = {}, body = {} }) => {
    const clientSideResponse = { headers: {} };
    await handler(
      new ServerSideRequest({ params, query, headers, body }),
      new ServerSideResponse(clientSideResponse),
    );
    return clientSideResponse;
  };
