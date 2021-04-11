import { ServerError } from './ServerError.js'

export class MissingFieldsError extends ServerError {
    constructor(missingFields){
        super(400, `missing fields: ${missingFields}`);
    }
}