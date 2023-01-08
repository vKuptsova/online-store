import Page from '../templates/page';
import MainPage from '../pages/main/main';
import { PageIds } from '../constants';
import ProductPage from '../pages/product/product';
import BasketPage from '../pages/basket/basket';
import ErrorPage, { ErrorTypes } from '../pages/error/error';

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'current-page';

    constructor() {}

    static renderNewPage(idPage: string, productId = '') {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.ProductPage) {
            page = new ProductPage(idPage, productId);
        } else if (idPage === PageIds.BasketPage) {
            page = new BasketPage(idPage);
        } else {
            page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            const header = document.querySelector('.header');
            (header as HTMLElement).after(pageHTML);
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const location = window.location.hash.slice(1);
            const hash = location.split('/')[0];
            const productId = location.split('/')[1] || '';
            App.renderNewPage(hash, productId);
        });
    }

    public toBasketPage(): void {
        const basketLink = document.querySelector('.header_basket-link');
        (basketLink as HTMLElement).addEventListener('click', () => {
            window.location.hash = PageIds.BasketPage;
            App.renderNewPage(PageIds.BasketPage);
        });
    }

    public toMainPage(): void {
        const mainPageLink = document.querySelector('.header_link');
        (mainPageLink as HTMLElement).addEventListener('click', () => {
            window.location.hash = PageIds.MainPage;
            App.renderNewPage(PageIds.MainPage);
        });
    }

    public run(id: string, productId?: string): void {
        App.renderNewPage(id, productId);
        if (productId) {
            window.location.hash = `${id}/${productId}`;
        } else {
            window.location.hash = id;
        }

        this.enableRouteChange();
    }
}
export default App;
