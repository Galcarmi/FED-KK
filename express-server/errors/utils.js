import { ServerError } from './ServerError.js';

export const handleServerError = (e, res)=>{
    console.error(e);
    if(e instanceof ServerError){
        res.status(e.HTTPStatus).send(e.message);
    }
    else{
        res.status(500).send('internal server error');
    }
}