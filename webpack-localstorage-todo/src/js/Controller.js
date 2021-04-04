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
      handleTODODoneActionClick: (id) =>{
          this.handleTODODoneActionClick(id);
      },
      handleTODODeleteActionClick: (id) =>{
        this.handleTODODeleteActionClick(id);
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

  handleTODODoneAction(id) {
      this.view.toggleDoneTodoById(id);
  }

  handleTODODeleteActionClick(id){
      this.model.deleteTodoById(id);
      this.view.deleteTodoById(id);
  }
}
