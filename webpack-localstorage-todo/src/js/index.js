import "../styles/styles.css";
import { ViewCtrl } from "./ViewCtrl";
import { Model } from "./Model";
import { Controller } from "./Controller";
const model = new Model();
new Controller(model, new ViewCtrl(model));
