const { TodoDBManager } = require('./TodoDBManager');
const { IdNotFoundError } = require('../errors/IdNotFoundError');
const { MissingFieldsError } = require('../errors/MissingFieldsError');
const Todo = require('./models/Todo');

class TodoMongoDBManager extends TodoDBManager {
  constructor() {
    super();
  }

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
}

module.exports = {
    TodoMongoDBManager
}