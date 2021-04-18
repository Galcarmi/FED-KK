const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { TodoInMemoryDBManager } = require('./DBManager/TodoInMemoryDBManager.js');
const { logger } = require('./logger/logger.js');
const { eClientLocations } = require('./constants/clientLocations.js');
const { errorMiddleware, wrapError } = require('./middleware/errorHandler');

const parentFolder = path.join(__dirname, '../')
const todoInMemoryDBManager = new TodoInMemoryDBManager();
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.static(parentFolder + eClientLocations.TASK_4_CLIENT_DIST));

app.get('/', wrapError((req, res) => {
  res.sendFile(`${eClientLocations.TASK_4_CLIENT_DIST}/index.html`, {
    root: parentFolder,
  });
}));

app.post('/todo', wrapError((req, res) => {
    const addedTodo = todoInMemoryDBManager.addTodo(req.body);
    res.status(200).send(addedTodo);
}));

app.put('/todo', wrapError((req, res) => {
    const editedTodo = todoInMemoryDBManager.editTodo(req.body);
    res.status(200).send(editedTodo);
}));

app.delete('/todo/:id', wrapError((req, res) => {
    const deletedTodo = todoInMemoryDBManager.removeTodo(req.params.id);
    res.status(200).send(deletedTodo);  
}));

app.get('/todos', wrapError((req, res) => {
    const todos = todoInMemoryDBManager.getAllTodos();
    res.status(200).send(todos);  
}));

app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`listening on ${port}`);
});
