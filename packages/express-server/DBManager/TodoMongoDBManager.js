import mongoose from 'mongoose';
import { TodoDBManager } from './TodoDBManager.js';
import { IdNotFoundError } from '../errors/IdNotFoundError.js';
import { MissingFieldsError } from '../errors/MissingFieldsError.js';
import TodosModel from './models/TodosModel.js';

export class TodoMongoDBManager extends TodoDBManager {

  async addTodo(userId, todo) {
    if (!todo.content) {
      throw new MissingFieldsError('content');
    }
    
    const todoToInsert = new TodosModel({ content: todo.content, userId, isDone: false });

    return todoToInsert.save();
  }

  async removeTodo(userId, _id) {
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

  async connectToMongoServer(DBPassword){
    const DBURI = `mongodb+srv://admin:${DBPassword}@cluster0.5zncg.mongodb.net/todoapp?retryWrites=true&w=majority`;
    mongoose.connect(DBURI, {useNewUrlParser:true, useUnifiedTopology:true});
  }
}
