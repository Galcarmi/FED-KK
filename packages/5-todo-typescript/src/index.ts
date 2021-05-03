import './index.css';
import { Model } from './mvvc/Model';
import { ViewCtrl } from './mvvc/ViewCtrl';

(async () => {
  const app = new ViewCtrl(new Model());
  app.initializeApp();
  app.initPersistedTodos();
})();
