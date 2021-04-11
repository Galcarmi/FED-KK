import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { TodoIMDBManager } from './DBManager/TodoIMDBManager.js';
import { handleServerError } from './errors/utils.js';

const todoIMDBManager = new TodoIMDBManager();
const app = express();
const port = process.env.PORT || 8000;

app.set("port", port);
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req,res)=>{
  res.send('hello there');
})

app.post('/todo', (req,res)=>{
  try{
    todoIMDBManager.addTodo(req.body);
  }
  catch(e){
    handleServerError(e, res);
  }
})

app.put('/todo', (req,res)=>{
  try{
    todoIMDBManager.editTodo(req.body);
  }
  catch(e){
    handleServerError(e, res);
  }
})

app.delete('/todo', (req,res)=>{
  try{
    todoIMDBManager.removeTodo(req.body);
  }
  catch(e){
    handleServerError(e, res);
  }
})

app.get('/todos', (req,res)=>{
  try{
    todoIMDBManager.getAllTodos();
  }
  catch(e){
    handleServerError(e, res);
  }
})

app.listen(port, () => {
  console.info(`listening on ${port}`);
});
