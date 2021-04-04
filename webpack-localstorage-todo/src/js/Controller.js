import { View } from "./View";
import { Model } from "./Model";

export class Controller {
  //todo pass model,view from index.js
  constructor(model, view) {
    this.model = new Model();
    this.view = new View({
      handleAddActionTodo: (content) => {
        this.handleAddActionTodo(content);
      },
      handleTODODoneActionClick: (id) => {
        this.handleTODODoneActionClick(id);
      },
      handleTODODeleteActionClick: (id) => {
        this.handleTODODeleteActionClick(id);
      },
      handleTODOEditActionClick: (id) => {
        this.handleTODOEditActionClick(id);
      },
      handleTODOEditAction: ({id, content})=>{
          this.handleTODOEditAction({id, content});
      }
    });
  }

  handleAddActionTodo() {
    const textInputContent = this.view.getTextInputContent();
    const todo = this.model.addTodo(textInputContent);
    this.view.addTodo(todo);
    this.view.eraseTextInputContent();
    this.view.focusOnTextInput();
  }

  handleTODODoneActionClick(id) {
    this.view.hideTODOEditInputById(id);
    this.view.toggleDoneTodoById(id);
  }

  handleTODODeleteActionClick(id) {
    this.view.hideTODOEditInputById(id);
    this.model.deleteTodoById(id);
    this.view.deleteTodoById(id);
  }

  handleTODOEditActionClick(id) {
    const todo = this.model.getTodoItemById(id);
    this.view.showTODOEditInputById(todo);
  }

  handleTODOEditAction({id, content}){
    this.model.editTodoContentById({id, content})
    this.view.hideTODOEditInputById(id);
    this.view.reRenderTodoContentById({id, content});
  }
}
