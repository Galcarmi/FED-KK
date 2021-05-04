import mongoose from 'mongoose';

export interface ITodoModel extends mongoose.Document {
  userId: string;
  content: string;
  isDone: boolean;
  _id:string;
}
