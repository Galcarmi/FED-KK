export class ServerError extends Error {
  constructor(HTTPStatus, clientErrorMessage) {
    super(
      `server error ${HTTPStatus}: ${clientErrorMessage || 'internal error'}`
    );
    this.HTTPStatus = HTTPStatus;
  }
}
