import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId : String,
    content: String,
    isDone:Boolean,
})

const TodosModel = mongoose.model('Todo', todoSchema);

export default TodosModel;
