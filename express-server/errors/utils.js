import { ServerError } from './ServerError.js';
import { logger } from '../logger/logger.js';

export const handleServerError = (e, res)=>{
    logger.error(e);
    if(e instanceof ServerError){
        res.status(e.HTTPStatus).send(e.message);
    }
    else{
        res.status(500).send('internal server error');
    }
}