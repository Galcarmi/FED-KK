import mongoose from 'mongoose';
import { TodoDBManager } from './TodoDBManager.js';
import { IdNotFoundError } from '../errors/IdNotFoundError.js';
import { MissingFieldsError } from '../errors/MissingFieldsError.js';
import Todo from './models/Todo.js';

const DBURI = `mongodb+srv://admin:${process.env.DBPassword}@cluster0.5zncg.mongodb.net/todoapp?retryWrites=true&w=majority`;
export class TodoMongoDBManager extends TodoDBManager {

  async addTodo(userId, todo) {
    if (!todo.content) {
      throw new MissingFieldsError('content');
    }
    
    const todoToInsert = new Todo({ content: todo.content, userId, isDone: false });
    const insertedTodo = await todoToInsert.save()

    return insertedTodo;
  }

  async removeTodo(userId, _id) {
    if (!_id) {
      throw new MissingFieldsError('id');
    }
    
    const deletedTodo  = await Todo.findOneAndRemove({_id, userId})

    if(!deletedTodo){
        throw new IdNotFoundError(_id);
    }

    return deletedTodo._doc;
  }

  async editTodo(userId, todo) {
    if (!todo._id) {
      throw new MissingFieldsError('id');
    }

    let updatedTodo = await Todo.findOneAndUpdate({_id:todo._id, userId}, {...todo});

    if(!updatedTodo){
        throw new IdNotFoundError(todo._id);
    }
    
    updatedTodo = {...updatedTodo._doc, ...todo};
    return updatedTodo;
  }

  async getAllTodos(userId) {
    const todos = await Todo.find({userId});

    return todos;
  }

  async connectToMongoServer(){
    mongoose.connect(DBURI, {useNewUrlParser:true, useUnifiedTopology:true});
  }
}
