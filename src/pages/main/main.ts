import ProductList from '../../components/main/product-list/product-list';
import API from '../../api';
import { IFiltersOptions } from '../../types/filters-options.model';
import Sorting from '../../components/sorting/sorting';
import { IProduct } from '../../types/product.model';
import Filters from '../../components/filters/filter';
import Page from '../../templates/page';
import { SORT_TYPE } from '../../constants';
import headerCounter from '../../components/header/headerCounts';

const createProductsBlockMarkup = () => {
    return `<div class="products__header">
                     <p class="products__quantity">Found: <span class="products__quantity-value"></span></p>
                     <input class="products__search" type="text" placeholder="Enter product name">
                </div>
                <div class="products-cards"></div>`;
};

class MainPage extends Page {
    public filters: Filters;
    public sorting: Sorting;
    public api: API;
    public productList: ProductList;

    public products: IProduct[];

    public foundedProducts: IProduct[];

    public sortType = SORT_TYPE.PRICE_ASC;

    public headerCounter: headerCounter;
    // public url: URL;

    constructor(id: string) {
        super(id);
        this.filters = new Filters();
        this.sorting = new Sorting();
        this.api = new API();
        this.products = [];
        this.foundedProducts = [];
        this.productList = new ProductList();
        this.headerCounter = new headerCounter();
    }

    getDataForMainPage() {
        this.api.getProducts().then((products) => {
            this.products = products;
        });
    }

    render() {
        this.api.getProducts().then((response) => {
            this.products = response.products;
            this.foundedProducts = this.products.slice();
            const mainSection = document.createElement('div');
            mainSection.classList.add('main__block');
            (mainSection as HTMLElement).append(this.renderProductsSection());

            this.filters.init(this.getFiltersOptions(this.products), mainSection);
            const productsHeaderBlock = (mainSection as HTMLElement).querySelector('.products__header');
            this.sorting.init(productsHeaderBlock);
            const productQuantity = (productsHeaderBlock as HTMLElement).querySelector('.products__quantity-value');
            const productsCardsBlock = (mainSection as HTMLElement).querySelector('.products-cards');

            this.productList.drawCards(productsCardsBlock, this.getSortedProducts());
            this.container.append(mainSection);
            this.setProductsQuantity(productQuantity);

            this.onSortTypeChange(productsCardsBlock);
            this.onSearchProducts(productsCardsBlock, productQuantity);
            this.filters.onChangeAllFilters(mainSection, () => this.rerenderCards(productsCardsBlock, productQuantity));
            this.headerCounter.getHeaderBasket();
            this.headerCounter.getHeaderSumBasket();
        });
        return this.container;
    }
    //
    // onUrlChange(productsCardsBlock: Element | null): void {
    //     window.addEventListener('popstate', () => {
    //         console.log('window.location.search', window.location.search);
    //         const searchParams = new URLSearchParams(window.location.search);
    //         console.log('searchParams', searchParams);
    //         (productsCardsBlock as HTMLElement).innerHTML = '';
    //         for (const [key, value] of searchParams) {
    //             console.log(key, value);
    //         }
    //     });
    // }
    //
    // changeQueryParams(param: string, value: string, isDelete = false): void {
    //     isDelete ? this.url.searchParams.delete(param) : this.url.searchParams.set(param, value);
    //
    //     window.history.pushState({ path: this.url.href }, '', this.url.href);
    //     const popStateEvent = new PopStateEvent('popstate', { state: { path: this.url.href } });
    //     dispatchEvent(popStateEvent);
    // }

    rerenderCards(productsCardsBlock: Element | null, productQuantity: Element | null): void {
        this.foundedProducts = this.filters.getFilteredProducts(this.products);
        (productsCardsBlock as HTMLElement).innerHTML = '';
        this.foundedProducts.length === 0
            ? this.productList.renderEmptyBlock(productsCardsBlock)
            : this.productList.drawCards(productsCardsBlock, this.getSortedProducts());
        this.setProductsQuantity(productQuantity);
    }

    onSortTypeChange(productsCardsBlock: Element | null): void {
        const sortOptions = document.querySelector('.sorting-select');
        (sortOptions as HTMLElement)?.addEventListener('change', (event) => {
            this.sortType = (sortOptions as HTMLSelectElement).value;
            // this.changeQueryParams('sort', this.sortType);
            (productsCardsBlock as HTMLElement).innerHTML = '';
            this.productList.drawCards(productsCardsBlock, this.getSortedProducts());
        });
    }

    onSearchProducts(productsCardsBlock: Element | null, productQuantity: Element | null): void {
        const productsSearch = document.querySelector('.products__search');
        (productsSearch as HTMLElement)?.addEventListener('input', (event) => {
            const searchValue = (event.target as HTMLInputElement).value;
            (productsCardsBlock as HTMLElement).innerHTML = '';
            this.filters.filtersArray.searchValue = searchValue;
            this.rerenderCards(productsCardsBlock, productQuantity);
        });
    }

    setProductsQuantity(productQuantity: Element | null): void {
        (productQuantity as HTMLElement).innerText = this.foundedProducts.length.toString();
    }

    getSortedProducts(): IProduct[] {
        let sortedProducts: IProduct[] = [];
        switch (this.sortType) {
            case SORT_TYPE.PRICE_ASC:
                sortedProducts = this.foundedProducts.slice().sort((a, b) => b.price - a.price);
                break;
            case SORT_TYPE.PRICE_DESC:
                sortedProducts = this.foundedProducts.slice().sort((a, b) => a.price - b.price);
                break;
            case SORT_TYPE.RATING_ASC:
                sortedProducts = this.foundedProducts.slice().sort((a, b) => b.rating - a.rating);
                break;
            case SORT_TYPE.RATING_DESC:
                sortedProducts = this.foundedProducts.slice().sort((a, b) => a.rating - b.rating);
                break;
            case SORT_TYPE.DISCOUNT_ASC:
                sortedProducts = this.foundedProducts
                    .slice()
                    .sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            case SORT_TYPE.DISCOUNT_DESC:
                sortedProducts = this.foundedProducts
                    .slice()
                    .sort((a, b) => a.discountPercentage - b.discountPercentage);
                break;
        }
        return sortedProducts;
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
