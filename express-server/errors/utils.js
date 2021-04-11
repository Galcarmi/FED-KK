export const handleServerError = (e, res)=>{
    if(e instanceof ServerError){
        res.status(e.HTTPStatus).send(e.message);
    }
    else{
        res.status(500).send('internal server error');
    }
}