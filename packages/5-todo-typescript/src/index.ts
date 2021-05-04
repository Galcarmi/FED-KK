import './index.css';
import { Model } from './mvvc/Model';
import { ViewCtrl } from './mvvc/ViewCtrl';

const app = new ViewCtrl(new Model());
app.initializeApp();

