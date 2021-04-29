import mongoose from 'mongoose';
import { TodoDBManager } from './ITodoDBManager';
import { IdNotFoundError } from '../errors/IdNotFoundError';
import { MissingFieldsError } from '../errors/MissingFieldsError';
import TodosModel from './models/TodosModel';
import { ITodo } from './ITodo';

export class TodoMongoDBManager implements TodoDBManager {

  async addTodo(userId:string, todo:ITodo) {
    if (!todo.content) {
      throw new MissingFieldsError('content');
    }
    
    const todoToInsert = new TodosModel({ content: todo.content, userId, isDone: false });
    const lala = await todoToInsert.save();
    lala.
    const aa = lala.toObject()
    return todoToInsert.save();
  }

  async removeTodo(userId:string, _id:string) {
    if (!_id) {
      throw new MissingFieldsError('id');
    }
    
    const deletedTodo  = await TodosModel.findOneAndRemove({_id, userId})

    if(!deletedTodo){
        throw new IdNotFoundError(_id);
    }

    return deletedTodo._doc;
  }

  async editTodo(userId, todo) {
    if (!todo._id) {
      throw new MissingFieldsError('id');
    }

    let updatedTodo = await TodosModel.findOneAndUpdate({_id:todo._id, userId}, {...todo});

    if(!updatedTodo){
        throw new IdNotFoundError(todo._id);
    }
    
    updatedTodo = {...updatedTodo._doc, ...todo};
    return updatedTodo;
  }

  async getAllTodos(userId) {
    return TodosModel.find({userId});
  }

  async connectToMongoServer(DBPassword: string){
    const DBURI = `mongodb+srv://admin:${DBPassword}@cluster0.5zncg.mongodb.net/todoapp?retryWrites=true&w=majority`;
    mongoose.connect(DBURI, {useNewUrlParser:true, useUnifiedTopology:true});
  }
}
