import './index.css';
import { ViewCtrl } from './mvvc/ViewCtrl';

(async () => {
  const app = new ViewCtrl();
  app.initializeApp();
})();
