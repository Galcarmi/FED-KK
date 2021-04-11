export class IdNotFoundError extends ServerError{
    constructor(id){
        super(400, `id not found: ${id}`)
    }
}