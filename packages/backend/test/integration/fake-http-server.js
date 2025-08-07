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
  (handler, errorHandler) =>
  async ({ params = {}, query = {}, headers = {}, body = {} }) => {
    const clientSideResponse = { headers: {} };
    const req = new ServerSideRequest({ params, query, headers, body });
    const res = new ServerSideResponse(clientSideResponse);

    try {
      await handler(req, res);
    } catch (error) {
      await errorHandler(error, req, res);
    }
    return clientSideResponse;
  };
