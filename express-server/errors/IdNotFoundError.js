const { ServerError } = require('./ServerError.js');
const { HTTPStatuses } = require('../constants/HTTPStatus.js');
class IdNotFoundError extends ServerError {
  constructor(id) {
    super(HTTPStatuses.BAD_REQUEST, `id not found: ${id}`);
  }
}

module.exports = {
  IdNotFoundError
}