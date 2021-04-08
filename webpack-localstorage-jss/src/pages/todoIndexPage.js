import { createContainer } from '../components/utils/container';
import { createTodoApp } from '../components/todo-app/todoApp';

export const createTodoIndexPage = () => {
  document.querySelector('body').innerHTML = createContainer({children:createTodoApp()});
};
