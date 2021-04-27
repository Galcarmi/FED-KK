const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const { TodoMongoDBManager } = require('./DBManager/TodoMongoDBManager');
const { logger } = require('./logger/logger');
const { eClientLocations } = require('./constants/clientLocations');
const { errorMiddleware, wrapError } = require('./middleware/errorHandler');
const { userIdMiddleware } = require('./middleware/userIdMiddleware')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const parentFolder = path.join(__dirname, '../')
const todoMongoDBManager = new TodoMongoDBManager();
const app = express();
const port = process.env.PORT || 8000;

const DBURI = `mongodb+srv://admin:${process.env.DBPassword}@cluster0.5zncg.mongodb.net/todoapp?retryWrites=true&w=majority`;

mongoose.connect(DBURI, {useNewUrlParser:true, useUnifiedTopology:true});
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
