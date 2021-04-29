import mongoose from 'mongoose';
import { TodoDBManager } from './ITodoDBManager';
import { IdNotFoundError } from '../errors/IdNotFoundError';
import { MissingFieldsError } from '../errors/MissingFieldsError';
import TodosModel from './models/TodosModel';
import { ITodoDTO } from './ITodo';
import { ITodoModel } from './models/ITodoModel';
import { todoDAO } from '../dao/TodoDAO';

export class TodoMongoDBManager implements TodoDBManager {
  async addTodo(userId: string, todo: ITodoDTO) {
    if (!todo.content) {
      throw new MissingFieldsError('content');
    }

    const todoToInsert = new TodosModel({
      content: todo.content,
      userId,
      isDone: false,
    });

    const insertedTodo = await todoToInsert.save();
    return todoDAO.extractItem(insertedTodo);
  }

  async removeTodo(userId: string, _id: string) {
    if (!_id) {
      throw new MissingFieldsError('id');
    }

    const deletedTodo = await TodosModel.findOneAndRemove({ _id, userId });

    if (!deletedTodo) {
      throw new IdNotFoundError(_id);
    }

    return deletedTodo;
  }

  async editTodo(userId: string, todo: ITodoDTO): Promise<ITodoModel> {
    if (!todo._id) {
      throw new MissingFieldsError('id');
    }

    const foundTodo = await TodosModel.findOneAndUpdate(
      { _id: todo._id, userId },
      { ...todo }
    );

    if (!foundTodo) {
      throw new IdNotFoundError(todo._id);
    }

    const updatedTodo = { ...foundTodo, ...todo };
    return updatedTodo;
  }

  async getAllTodos(userId: string) {
    return TodosModel.find({ userId });
  }

  async connectToMongoServer(DBPassword?: string): Promise<void> {
    const DBURI = `mongodb+srv://admin:${DBPassword}@cluster0.5zncg.mongodb.net/todoapp?retryWrites=true&w=majority`;
    mongoose.connect(DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
