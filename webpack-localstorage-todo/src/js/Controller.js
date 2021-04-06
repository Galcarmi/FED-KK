import { eShowHide } from './constants';

export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initTodosIfLocalStorageExists();
    
  }


  initTodosIfLocalStorageExists() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON) {
      const todos = JSON.parse(todosJSON);
      for (const todo of todos) {
        this.view.addTodo(todo);
      }

      this.model.setTodos(todos);
    }
  }

  
}
