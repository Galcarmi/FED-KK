import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { TodoIMDBManager } from './DBManager/TodoIMDBManager.js';
import { handleServerError } from './errors/utils.js';
import { logger } from './logger/logger.js';
import { getParentFolder } from './utils/folderUtils.js';

const parentFolder = getParentFolder();
const todoIMDBManager = new TodoIMDBManager();
const app = express();
const port = process.env.PORT || 8000;
app.set("port", port);
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(parentFolder+'/todo-express-client/dist'));

app.get('/', (req,res)=>{
  res.sendFile('/todo-express-client/dist/index.html', {root: parentFolder })
})

app.post('/todo', (req,res)=>{
  try{
    const addedTodo = todoIMDBManager.addTodo(req.body);
    res.status(200).send(addedTodo);
  }
  catch(e){
    handleServerError(e, res);
  }
})

app.put('/todo', (req,res)=>{
  try{
    const editedTodo = todoIMDBManager.editTodo(req.body);
    res.status(200).send(editedTodo);
  }
  catch(e){
    handleServerError(e, res);
  }
})

app.delete('/todo', (req,res)=>{
  try{
    console.log(res.body)
    const deletedTodo = todoIMDBManager.removeTodo(req.body.id);
    res.status(200).send(deletedTodo);
  }
  catch(e){
    handleServerError(e, res);
  }
})

app.get('/todos', (req,res)=>{
  try{
    const todos = todoIMDBManager.getAllTodos();
    res.status(200).send(todos);
  }
  catch(e){
    handleServerError(e, res);
  }
})

app.listen(port, () => {
  logger.info(`listening on ${port}`);
});
