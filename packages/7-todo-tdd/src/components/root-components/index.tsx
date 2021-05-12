import React from 'react';
import ReactDOM from 'react-dom';
import { TodosService } from '../../services/TodoService';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App todosService = {new TodosService()}/>
  </React.StrictMode>,
  document.getElementById('root')
);

