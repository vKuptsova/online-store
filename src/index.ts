import './global.css';
import App from './app/app';
import { PageIds } from './constants';

const app = new App();
// app.run(PageIds.MainPage);
// временно (видеть страницу продукта)
app.run(PageIds.ProductPage, '5');
app.toBasketPage();
app.toMainPage();
