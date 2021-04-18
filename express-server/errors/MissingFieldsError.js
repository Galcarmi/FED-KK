const { ServerError } = require('./ServerError.js');
const { HTTPStatuses } = require('../constants/HTTPStatus.js');

class MissingFieldsError extends ServerError {
  constructor(missingFields) {
    super(HTTPStatuses.BAD_REQUEST, `missing fields: ${missingFields}`);
  }
}

module.exports = {
  MissingFieldsError
}
