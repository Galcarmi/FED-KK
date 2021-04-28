import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { TodoMongoDBManager } from './DBManager/TodoMongoDBManager.js';
import { logger } from './logger/logger.js';
import { eClientLocations } from './constants/clientLocations.js';
import { errorMiddleware, wrapError } from './middleware/errorHandler.js';
import { userIdMiddleware } from './middleware/userIdMiddleware.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const parentFolder = path.join(process.cwd(), '../')
const todoMongoDBManager = new TodoMongoDBManager();
todoMongoDBManager.connectToMongoServer(process.env.DBPassword);
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.static(parentFolder + eClientLocations.PRODUCTION));
app.use(cookieParser())
app.use(userIdMiddleware);

app.get('/', wrapError((req, res) => {
  res.sendFile(`${eClientLocations.PRODUCTION}/index.html`, {
    root: parentFolder,
  });
}));

app.post('/todo', wrapError(async (req, res) => {
    const addedTodo = await todoMongoDBManager.addTodo(req.userId, req.body);
    res.status(200).send(addedTodo);
}));

app.put('/todo', wrapError(async (req, res) => {
    const editedTodo = await todoMongoDBManager.editTodo(req.userId, req.body);
    res.status(200).send(editedTodo);
}));

app.delete('/todo/:id', wrapError(async (req, res) => {
    const deletedTodo = await todoMongoDBManager.removeTodo(req.userId, req.params.id);
    res.status(200).send(deletedTodo);  
}));

app.get('/todos', wrapError(async (req, res) => {
    const todos = await todoMongoDBManager.getAllTodos(req.userId);
    res.status(200).send(todos);  
}));

app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`listening on ${port}`);
});
