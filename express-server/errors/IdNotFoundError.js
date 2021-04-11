import { ServerError } from './ServerError.js'
import { HTTPStatuses } from '../constants/HTTPStatus.js'
export class IdNotFoundError extends ServerError{
    constructor(id){
        super(HTTPStatuses.BAD_REQUEST, `id not found: ${id}`)
    }
}