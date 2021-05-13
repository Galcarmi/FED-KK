import React from 'react';
import ReactDOM from 'react-dom';
import { TodosService } from '../../services/TodoService';
import TodosApp from '../todo-app/TodosApp';

ReactDOM.render(
  <React.StrictMode>
    <TodosApp todosService = {new TodosService()}/>
  </React.StrictMode>,
  document.getElementById('root')
);

