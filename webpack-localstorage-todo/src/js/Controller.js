import { eShowHide } from './constants';
import { View } from "./View";
import { Model } from "./Model";

export class Controller{
    //todo pass model,view from index.js
    constructor(model, view){
        this.model = new Model();
        this.view = new View();

        this.view.initEventListeners({handleAddActionTodo:(content)=>{this.handleAddActionTodo(content)}});
    }

    handleAddActionTodo(){
        const textInputContent = this.view.getTextInputContent();
        const todo = this.model.addTodo(textInputContent);
        this.view.addTodo(todo);
        this.view.eraseTextInputContent();
        this.view.focusOnTextInput();
    }

    handleTODODoneDeleteAction(){
        
    }
}