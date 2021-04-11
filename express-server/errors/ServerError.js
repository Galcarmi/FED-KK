export class ServerError extends Error {
    constructor(HTTPStatus, clientErrorMessage){
        this.HTTPStatus = HTTPStatus;
        super(`server error ${HTTPStatus}: ${clientErrorMessage || 'internal error'}`);
    }
}