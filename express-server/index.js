const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { TodoInMemoryDBManager } = require('./DBManager/TodoInMemoryDBManager.js');
const { handleServerError } = require('./errors/utils.js');
const { logger } = require('./logger/logger.js');
const { eClientLocations } = require('./constants/clientLocations.js');

const parentFolder = path.join(__dirname, '../')
const todoInMemoryDBManager = new TodoInMemoryDBManager();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(parentFolder + eClientLocations.TASK_4_CLIENT_DIST));

app.get('/', (req, res) => {
  res.sendFile(`${eClientLocations.TASK_4_CLIENT_DIST}/index.html`, {
    root: parentFolder,
  });
});

app.post('/todo', (req, res) => {
  try {
    const addedTodo = todoInMemoryDBManager.addTodo(req.body);
    res.status(200).send(addedTodo);
  } catch (e) {
    handleServerError(e, res);
  }
});

app.put('/todo', (req, res) => {
  try {
    const editedTodo = todoInMemoryDBManager.editTodo(req.body);
    res.status(200).send(editedTodo);
  } catch (e) {
    handleServerError(e, res);
  }
});

app.delete('/todo/:id', (req, res) => {
  try {
    const deletedTodo = todoInMemoryDBManager.removeTodo(req.params.id);
    res.status(200).send(deletedTodo);
  } catch (e) {
    handleServerError(e, res);
  }
});

app.get('/todos', (req, res) => {
  try {
    const todos = todoInMemoryDBManager.getAllTodos();
    res.status(200).send(todos);
  } catch (e) {
    handleServerError(e, res);
  }
});

app.listen(port, () => {
  logger.info(`listening on ${port}`);
});
