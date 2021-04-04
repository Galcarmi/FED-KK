import "./styles.css";
import { View } from "./js/View";
import { Model } from "./js/Model";
import { Controller } from "./js/Controller";

const app = new Controller(new Model(), new View())
app.view.addTodo({content:'asdasd', id:"2"})
app.view.addTodo({content:'czv', id:"3"})
app.view.addTodo({content:'asdasd', id:"4"})
console.log("lalala");
