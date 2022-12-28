
import API from '../../api';
import { IFiltersOptions } from '../../types/filters-options.model';
import Sorting from '../../components/sorting/sorting';
import { IProduct } from '../../types/product.model';
import Filters from '../../components/filters/filter';
import Page from '../../templates/page';

const createProductsBlockMarkup = () => {
    return `<div class="products__header">
                     <p class="products__quantity">Found: <span class="products__quantity-value"></span></p>
                     <input class="products__search" type="text" placeholder="Enter product name">
                </div>
                <ul class="products-cards"></ul>`;
};

class MainPage extends Page {
    public filters: Filters;
    public sorting: Sorting;
    public api: API;
    public products: IProduct[];

    constructor(id: string) {
        super(id);
        this.filters = new Filters();
        this.sorting = new Sorting();
        this.api = new API();
        this.products = [];
    }

    getDataForMainPage() {
        this.api.getProducts().then((products) => {
            this.products = products;
        });
    }

    render() {
        this.api.getProducts().then((response) => {
            this.products = response.products;
            const mainSection = document.createElement('div');
            mainSection.classList.add('main__block');
            (mainSection as HTMLElement).append(this.renderProductsSection());

            this.filters.init(this.getFiltersOptions(this.products), mainSection);
            const productsHeaderBlock = (mainSection as HTMLElement).querySelector('.products__header');
            this.sorting.init(productsHeaderBlock);

        const productsCardsBlock = (mainSection as HTMLElement).querySelector('.products-cards');
        const cards = new ProductList();
        cards.drawCards(productsCardsBlock);
            const productsCardsBlock = (mainSection as HTMLElement).querySelector('.products-cards');
            // this.products.init(Store.getProducts(), productsCardsBlock);

            // Здесь должны отдаваться разметка всех карточек для рендера. В блок products-cards Передавать в метод рендера
            // класса productsCardsBlock и туда закидывать карточки
            // Но до этого получить данные с бэка на уровне main.page и пока где-то здесь сохранить в переменной

            this.container.append(mainSection);
        });
        return this.container;
    }

    renderProductsSection(): HTMLElement {
        const productsSection = document.createElement('section');
        productsSection.classList.add('products');
        productsSection.classList.add('container');
        productsSection.innerHTML = createProductsBlockMarkup();
        return productsSection;
    }

    getFiltersOptions(products: IProduct[]): IFiltersOptions {
        const categories = [
            ...new Set(
                products.reduce((result: string[], product) => {
                    return [...result, product.category];
                }, [])
            ),
        ];
        const brands = [
            ...new Set(
                products.reduce((result: string[], product) => {
                    return [...result, product.brand];
                }, [])
            ),
        ];
        const prices = [
            ...new Set(
                products.reduce((result: number[], product) => {
                    return [...result, product.price];
                }, [])
            ),
        ];
        const stocks = [
            ...new Set(
                products.reduce((result: number[], product) => {
                    return [...result, product.stock];
                }, [])
            ),
        ];
        return {
            categories,
            brands,
            price: {
                min: Math.min(...prices),
                max: Math.max(...prices),
            },
            stock: {
                min: Math.min(...stocks),
                max: Math.max(...stocks),
            },
        };
    }
}

export default MainPage;
