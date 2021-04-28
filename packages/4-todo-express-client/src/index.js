import './index.css';
import { ViewCtrl } from './mvvc/ViewController';
import { Model } from './mvvc/Model';

(async () => {
  const app = new ViewCtrl(new Model());
  app.renderTodoPage();
  await app.initPersistedTodos();
  app.initEventListeners();
})();
