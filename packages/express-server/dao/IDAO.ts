import { NullableDTO } from '../dto/utils/NullableDTO';
export interface IDAO<T> {
  findItem(identifier: Object): Promise<NullableDTO<T>>;
  editItem(identifier: Object, itemToUpdate:Partial<T>): Promise<NullableDTO<T>>;
  removeItem(identifier: Object): Promise<NullableDTO<T>>;
  addItem(item: T): Promise<T>;
  findItems(identifier:Object):Promise<Array<NullableDTO<T>>>
}
