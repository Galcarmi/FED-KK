import { ServerError } from './ServerError.js'
import { HTTPStatuses } from '../constants/HTTPStatus.js'

export class MissingFieldsError extends ServerError {
    constructor(missingFields){
        super(HTTPStatuses.BAD_REQUEST, `missing fields: ${missingFields}`);
    }
}