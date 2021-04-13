import './index.css';
import { ViewCtrl } from './mvvc/ViewController';
import { Model } from './mvvc/Model';

(async () => {
  const app = new ViewCtrl(new Model());
  await app.initPersistedTodos();
})();
