import mongoose from 'mongoose';
import { ITodoModel } from './ITodoModel';

const todoSchema: mongoose.Schema<ITodoModel> = new mongoose.Schema({
  userId: String,
  content: String,
  isDone: Boolean,
});

const TodosModel: mongoose.Model<ITodoModel, {}> = mongoose.model<ITodoModel>(
  'Todo',
  todoSchema
);

export default TodosModel;
