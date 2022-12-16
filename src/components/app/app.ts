import Page from '../../core/templates/page';
import MainPage from '../main/main';
import { PageIds } from '../../constants';
import ProductPage from '../product/product';
import BasketPage from '../basket/basket';
import ErrorPage, { ErrorTypes } from '../error/error';

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'current-page';

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.ProductPage) {
            page = new ProductPage(idPage);
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
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
        });
    }

    public toBasketPage(): void {
        const basketLink = document.querySelector('.header_basket-link');
        (basketLink as HTMLElement).addEventListener('click', () => {
            this.run(PageIds.BasketPage);
        });
    }

    public run(id: string): void {
        App.renderNewPage(id);
        window.location.hash = id;
        this.enableRouteChange();
    }
}
export default App;
