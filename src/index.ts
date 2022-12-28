import './global.css';
import App from './app/app';
import { PageIds } from './constants';

const app = new App();
app.run(PageIds.MainPage);
app.toBasketPage();
