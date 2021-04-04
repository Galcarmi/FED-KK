import "../styles/styles.css";
import { View } from "./View";
import { Model } from "./Model";
import { Controller } from "./Controller";
import {eShowHide} from './constants';

const app = new Controller()
app.view.addTodo({content:'asdasd', id:"2"})
app.view.addTodo({content:'czv', id:"3"})
app.view.addTodo({content:'asdasd', id:"4"})
app.view.showOrHideEmptyState(eShowHide.SHOW);
app.view.deleteTodoById(3);
app.view.reRenderTodoContentById({id:2,content:'rerender'});
app.view.toggleDoneTodoById(2);
app.view.init
console.log("lalala");
