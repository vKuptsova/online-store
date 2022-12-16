import './global.css';
import App from '../src/components/app/app';
import { PageIds } from './constants';

const app = new App();
app.run(PageIds.MainPage);
app.toBasketPage();
