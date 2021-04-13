import { getContainer } from '../components/utils/container/container.js';
import { getTodoApp } from '../components/todo-app/todoApp.js';

export const renderTodoPage = () => {
  document.querySelector('body').innerHTML = getContainer({
    children: getTodoApp(),
  });
};
