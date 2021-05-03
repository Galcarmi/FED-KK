import { Nullable } from 'fed-todo-journey_todo-common';
export interface IDAO<T> {
  findItem(identifier: Object): Promise<Nullable<T>>;
  editItem(
    identifier: Object,
    itemToUpdate: Partial<T>
  ): Promise<Nullable<T>>;
  removeItem(identifier: Object): Promise<Nullable<T>>;
  addItem(item: T): Promise<T>;
  findItems(identifier: Object): Promise<Array<Nullable<T>>>;
}
