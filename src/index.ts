import './global.css';
import App from './app/app';
import { PageIds } from './constants';

const app = new App();
window.addEventListener('load', () => {
    const locationData = app.getLocationData();
    if (locationData.hash === '') {
        app.run(PageIds.MainPage);
    } else {
        app.run(locationData.hash, locationData.productId);
    }
});
app.toBasketPage();
app.toMainPage();
