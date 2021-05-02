import { ITodoDTO } from '../dto/todo/ITodoDTO';
import { Nullable } from '../dto/utils/NullableDTO';
import { IDAO } from './IDAO';
import TodosModel from '../models/TodosModel';
import { ITodoIdentifier } from '../dto/todo/ITodoIdentifier';

export class TodoDAO implements IDAO<ITodoDTO> {
  public async findItems(identifier: Partial<ITodoDTO>): Promise<ITodoDTO[]> {
    const todos = await TodosModel.find(identifier);
    const todosToReturn = todos.map(this.extractItem.bind(this));

    return todosToReturn;
  }

  public async addItem(todo: ITodoDTO): Promise<ITodoDTO> {
    const todoToInsert = new TodosModel({
      content: todo.content,
      userId: todo.userId,
      isDone: todo.isDone,
    });
    
    const insertedTodo = await todoToInsert.save();

    return this.extractItem(insertedTodo);
  }

  public async findItem(
    identifier: ITodoIdentifier
  ): Promise<Nullable<ITodoDTO>> {
    const todo = await TodosModel.findOne(identifier);

    return this.extractNullableItem(todo);
  }

  public async editItem(
    identifier: ITodoIdentifier,
    todoToUpdate: Partial<ITodoDTO>
  ): Promise<Nullable<ITodoDTO>> {
    let updatedTodo = null;
    const foundTodo = await TodosModel.findOneAndUpdate(identifier, {
      ...todoToUpdate,
    });
    if (foundTodo) {
      updatedTodo = { ...foundTodo, ...todoToUpdate };
    }

    return this.extractNullableItem(updatedTodo);
  }
  public async removeItem(
    identifier: ITodoIdentifier
  ): Promise<Nullable<ITodoDTO>> {
    const deletedTodo = await TodosModel.findOneAndRemove(identifier);
    return this.extractNullableItem(deletedTodo);
  }

  private extractNullableItem(
    item: Nullable<ITodoDTO>
  ): Nullable<ITodoDTO> {
    const extractedItem = item ? this.extractItem(item) : null;

    return extractedItem;
  }

  private extractItem(item: ITodoDTO): ITodoDTO {
    return {
      content: item.content,
      _id: item._id,
      isDone: item.isDone,
      userId: item.userId,
    };
  }
}

export const todoDAO = new TodoDAO();
