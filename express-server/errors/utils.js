import { ServerError } from './ServerError.js';
import { logger } from '../logger/logger.js';
import { HTTPStatuses } from '../constants/HTTPStatus.js'

export const handleServerError = (e, res)=>{
    logger.error(e);
    if(e instanceof ServerError){
        res.status(e.HTTPStatus).send(e.message);
    }
    else{
        res.status(HTTPStatuses.INTERNAL_SERVER_ERROR).send('internal server error');
    }
}