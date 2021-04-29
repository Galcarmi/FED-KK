export interface IDAO<T>{
    extractItem(item:T):T;
    findItem(id:string):T;
    editItem()
}