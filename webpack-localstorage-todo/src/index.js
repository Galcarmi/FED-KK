import "./styles.css";
import { View } from "./js/View";
import { Model } from "./js/Model";
import { Controller } from "./js/Controller";
import {eShowHide} from './js/constants';

const app = new Controller(new Model(), new View())
app.view.addTodo({content:'asdasd', id:"2"})
app.view.addTodo({content:'czv', id:"3"})
app.view.addTodo({content:'asdasd', id:"4"})
app.view.showOrHideEmptyState(eShowHide.SHOW);
app.view.deleteTodoById(3);
app.view.reRenderTodoContentById({id:2,content:'rerender'});
app.view.toggleDoneTodoById(2);
console.log("lalala");
