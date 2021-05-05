import './index.css';
import { TodosViewModel } from './mvvc/TodosViewModel';
import { ViewCtrl } from './mvvc/ViewCtrl';

const app = new ViewCtrl(new TodosViewModel());
app.initializeApp();

