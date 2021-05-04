import { ITodoDTO } from 'fed-todo-journey_todo-common';
import { Nullable } from 'fed-todo-journey_todo-common';
import { IDAO } from './IDAO';
import TodosModel from '../models/TodosModel';
import { ITodoIdentifier, PartialBy } from 'fed-todo-journey_todo-common';
import { ITodoModel } from '../models/ITodoModel';

export class TodoDAO implements IDAO<ITodoDTO> {
  public async findItems(identifier: Partial<ITodoDTO>): Promise<ITodoDTO[]> {
    const todos: ITodoModel[] = await TodosModel.find(identifier);
    const todosToReturn: ITodoDTO[] = todos.map(this.extractItem.bind(this));

    return todosToReturn;
  }

  public async addItem(todo: PartialBy<ITodoDTO, '_id'>): Promise<ITodoDTO> {
    const todoToInsert: ITodoModel = new TodosModel({
      content: todo.content,
      userId: todo.userId,
      isDone: todo.isDone,
    });

    const insertedTodo: ITodoModel = await todoToInsert.save();

    return this.extractItem(insertedTodo);
  }

  public async findItem(
    identifier: ITodoIdentifier
  ): Promise<Nullable<ITodoDTO>> {
    const todo: Nullable<ITodoModel> = await TodosModel.findOne(identifier);

    return this.extractNullableItem(todo);
  }

  public async editItem(
    identifier: ITodoIdentifier,
    todoToUpdate: Partial<ITodoDTO>
  ): Promise<Nullable<ITodoDTO>> {
    let updatedTodo : Nullable<ITodoModel> = null;
    const foundTodo: Nullable<ITodoModel> = await TodosModel.findOneAndUpdate(
      identifier,
      {
        ...todoToUpdate,
      }
    );
    if (foundTodo) {
      //todo ask ofir
      updatedTodo = <ITodoModel>{ ...foundTodo, ...todoToUpdate };
    }

    return this.extractNullableItem(updatedTodo);
  }

  public async removeItem(
    identifier: ITodoIdentifier
  ): Promise<Nullable<ITodoDTO>> {
    const deletedTodo: Nullable<ITodoModel> = await TodosModel.findOneAndRemove(
      identifier
    );
    return this.extractNullableItem(deletedTodo);
  }

  public async deleteAllTodos(): Promise<void> {
    await TodosModel.deleteMany({});
  }

  private extractNullableItem(item: Nullable<ITodoModel>): Nullable<ITodoDTO> {
    return item ? this.extractItem(item) : null;
  }

  private extractItem(item: ITodoModel): ITodoDTO {
    return {
      content: item.content,
      _id: item._id,
      isDone: item.isDone,
      userId: item.userId,
    };
  }
}

export const todoDAO = new TodoDAO();
