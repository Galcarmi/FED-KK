import React from 'react';
import ReactDOM from 'react-dom';
import { TodosService } from '../../services/TodoService';
import TodoApp from '../todo-app/TodoApp';

ReactDOM.render(
  <React.StrictMode>
    <TodoApp/>
  </React.StrictMode>,
  document.getElementById('root')
);

