import mongoose from 'mongoose';

interface ITodoModel {
  userId: String;
  content: String;
  isDone: Boolean;
}

const todoSchema: mongoose.Schema<
  mongoose.Document<ITodoModel>,
  mongoose.Model<any>
> = new mongoose.Schema({
  userId: String,
  content: String,
  isDone: Boolean,
});

const TodosModel: mongoose.Model<
  mongoose.Document<ITodoModel>
> = mongoose.model('Todo', todoSchema);

export default TodosModel;
