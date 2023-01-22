import './filter.css';
import {
    FilterMultiRangeValue,
    FiltersResultData,
    FiltersValues,
    FilterValue,
    FilterWithQuantity,
    IFiltersOptions,
    Price,
    Stock,
} from '../../types/filters-options.model';
import { IProduct } from '../../types/product.model';
import { FILTER_TYPE } from '../../constants';

const createFiltersMainMarkup = () => {
    return `<div class="filters__button">
                <button class="button-filter button-filter--reset" type="reset">Reset filters</button>
                <button class="button-filter button-filter--copy" type="button">Copy link</button>
            </div>
            <div class="filters__category">
                <h2 class="filters-title">Category</h2>
                <ul class="filters-list filters-list--category"></ul>
            </div>
            <div class="filters__brand">
                <h2 class="filters-title">Brand</h2>
                <ul class="filters-list filters-list--brand"></ul>
            </div>
            <div class="filters__price"></div>
            <div class="filters__stock"></div>`;
};

const createFilterMarkup = ({ value, quantity }: FilterWithQuantity) => {
    return `<li class="filter-item">
             <input id="filter-${value}" class="filter-item__input" type="checkbox" value="${value}">
             <label class="filter-item__label" for="filter-${value}">${value}</label>
             <span class="filter-item__quantity"><span class="filter-item__founded">${quantity}</span> / ${quantity}</span>
        </li>`;
};

const createRangeSliderMarkup = (min: number, max: number, isPriceBlock: boolean) => {
    return `<h2 class="filters-title">${isPriceBlock ? `Price` : `Stock`}</h2>
            <div class="input-value">
            <span class="input-value-min">${min}</span>
            <span class="input-divider"></span>
            <span class="input-value-max">${max}</span>
        </div>
        <div class="input-range">
          <span class="input-range-full"></span>
          <input class="input-range-min" type="range" min="${min}" max="${max}" step="1" value="${min}">
          <input class="input-range-max" type="range" min="${min}" max="${max}" step="1" value="${max}">
        </div>`;
};

const INIT_FILTERS_VALUE = {
    category: [],
    brand: [],
    searchValue: '',
    price: {
        min: 0,
        max: 0,
    },
    stock: {
        min: 0,
        max: 0,
    },
};

class Filters {
    public filtersArray: FiltersValues;
    public price: Price;
    public stock: Stock;
    public priceBlock: Element | null;
    public stockBlock: Element | null;

    constructor() {
        this.filtersArray = INIT_FILTERS_VALUE;
        this.price = INIT_FILTERS_VALUE.price;
        this.stock = INIT_FILTERS_VALUE.stock;
        this.priceBlock = null;
        this.stockBlock = null;
    }
    init({ categories, brands, price, stock }: IFiltersOptions, mainBlock: Element | null): void {
        this.price = price;
        this.stock = stock;
        this.filtersArray = {
            ...this.filtersArray,
            price: {
                min: price.min,
                max: price.max,
            },
            stock: {
                min: stock.min,
                max: stock.max,
            },
        };
        this.appendFiltersBlock(mainBlock);

        const filtersCategoryList = (mainBlock as HTMLElement).querySelector('.filters-list--category');
        const filtersBrandList = (mainBlock as HTMLElement).querySelector('.filters-list--brand');
        this.priceBlock = (mainBlock as HTMLElement).querySelector('.filters__price');
        this.stockBlock = (mainBlock as HTMLElement).querySelector('.filters__stock');

        const filtersCategoryMarkup = categories.map((filterValue) => createFilterMarkup(filterValue)).join(`\n`);
        const filtersBrandsMarkup = brands.map((filterValue) => createFilterMarkup(filterValue)).join(`\n`);
        (filtersCategoryList as HTMLElement).innerHTML = filtersCategoryMarkup;
        (filtersBrandList as HTMLElement).innerHTML = filtersBrandsMarkup;
        (this.priceBlock as HTMLElement).innerHTML = createRangeSliderMarkup(price.min, price.max, true);
        (this.stockBlock as HTMLElement).innerHTML = createRangeSliderMarkup(stock.min, stock.max, false);
    }

    onRangeInputsChange(mainBlock: Element | null, callback: () => void): void {
        const filtersPriceBlock = (mainBlock as HTMLElement).querySelector('.filters__price');
        const filtersStockBlock = (mainBlock as HTMLElement).querySelector('.filters__stock');
        this.onMultiRangeChange(filtersPriceBlock, FILTER_TYPE.PRICE, callback);

        this.onMultiRangeChange(filtersStockBlock, FILTER_TYPE.STOCK, callback);
    }

    appendFiltersBlock(mainBlock: Element | null): void {
        const filtersBlock = document.createElement('form');
        (mainBlock as HTMLElement).append(filtersBlock);
        filtersBlock.classList.add('filters');
        filtersBlock.innerHTML = createFiltersMainMarkup();
    }

    onMultiRangeChange(parent: Element | null, filterType: FilterMultiRangeValue, callback: () => void): void {
        const inputPriceMin = (parent as HTMLElement).querySelector('.input-range-min');
        const inputPriceMax = (parent as HTMLElement).querySelector('.input-range-max');
        const minPrice = (parent as HTMLElement).querySelector('.input-value-min');
        const maxPrice = (parent as HTMLElement).querySelector('.input-value-max');

        (inputPriceMin as HTMLElement).oninput = (event) => {
            const inputValue = Number((event.target as HTMLInputElement).value);
            const maxPriceValue = Number((inputPriceMax as HTMLInputElement).value);

            if (inputValue > maxPriceValue) {
                (maxPrice as HTMLElement).innerText = `${inputValue}`;
                (inputPriceMax as HTMLInputElement).value = `${inputValue}`;
            }

            (minPrice as HTMLElement).innerText = `${inputValue}`;
            (inputPriceMin as HTMLInputElement).value = `${inputValue}`;

            this.filtersArray[filterType] = {
                min: Number((inputPriceMin as HTMLInputElement).value),
                max: Number((inputPriceMax as HTMLInputElement).value),
            };

            callback();
        };

        (inputPriceMax as HTMLElement).oninput = (event) => {
            const inputValue = Number((event.target as HTMLInputElement).value);
            const minPriceValue = Number((inputPriceMin as HTMLInputElement).value);

            if (inputValue < minPriceValue) {
                (minPrice as HTMLElement).innerText = `${inputValue}`;
                (inputPriceMin as HTMLInputElement).value = `${inputValue}`;
            }
            (maxPrice as HTMLElement).innerText = `${inputValue}`;
            (inputPriceMax as HTMLInputElement).value = `${inputValue}`;

            this.filtersArray[filterType] = {
                min: Number((inputPriceMin as HTMLInputElement).value),
                max: Number((inputPriceMax as HTMLInputElement).value),
            };

            callback();
        };
    }

    onChangeFilters(type: FilterValue, callback: () => void): void {
        const filterBlock = document.querySelector(`.filters__${type}`);
        (filterBlock as HTMLElement)?.addEventListener('change', (event) => {
            const filterValue = (event.target as HTMLInputElement).value;
            this.filtersArray[type].includes(filterValue)
                ? this.filtersArray[type].splice(this.filtersArray[type].indexOf(filterValue), 1)
                : this.filtersArray[type].push(filterValue);
            callback();
        });
    }

    searchFilterValue(product: IProduct, value: string): boolean {
        return value === ''
            ? true
            : product.title.toLowerCase().includes(value.toLowerCase()) ||
                  product.brand.toLowerCase().includes(value.toLowerCase()) ||
                  product.category.toLowerCase().includes(value.toLowerCase()) ||
                  product.description.toLowerCase().includes(value.toLowerCase()) ||
                  product.category.toLowerCase().includes(value.toLowerCase()) ||
                  (product.stock + '').includes(value) ||
                  (product.discountPercentage + '').includes(value) ||
                  (product.price + '').includes(value) ||
                  (product.rating + '').includes(value);
    }

    categoryFilterValue(product: IProduct, category: string[]): boolean {
        return !category.length ? true : category.includes(product.category);
    }

    brandsFilterValue(product: IProduct, brands: string[]): boolean {
        return !brands.length ? true : brands.includes(product.brand);
    }

    priceFilterValue(product: IProduct, price: Price): boolean {
        return product.price >= price.min && product.price <= price.max;
    }

    stockFilterValue(product: IProduct, stock: Stock): boolean {
        return product.stock >= stock.min && product.stock <= stock.max;
    }

    getFilteredProducts(products: IProduct[]): IProduct[] {
        let filteredProducts = products.slice().filter((product) => {
            return (
                this.searchFilterValue(product, this.filtersArray.searchValue) &&
                this.categoryFilterValue(product, this.filtersArray.category) &&
                this.brandsFilterValue(product, this.filtersArray.brand) &&
                this.priceFilterValue(product, this.filtersArray.price) &&
                this.stockFilterValue(product, this.filtersArray.stock)
            );
        });

        return filteredProducts;
    }

    onResetFiltersClick(callback: () => void): void {
        const resetFilters = document.querySelector('.button-filter--reset');
        (resetFilters as HTMLButtonElement)?.addEventListener('click', () => {
            this.filtersArray = {
                ...this.filtersArray,
                category: [],
                brand: [],
                price: this.price,
                stock: this.stock,
            };

            this.updateMultiRangeInputValue(this.priceBlock, this.filtersArray[FILTER_TYPE.PRICE]);
            this.updateMultiRangeInputValue(this.stockBlock, this.filtersArray[FILTER_TYPE.STOCK]);

            callback();
        });
    }

    updateMultiRangeInputValue(parentElement: Element | null, value: Stock): void {
        const minPriceInput = (parentElement as HTMLElement).querySelector('.input-range-min');
        const maxPriceInput = (parentElement as HTMLElement).querySelector('.input-range-max');
        const minPrice = (parentElement as HTMLElement).querySelector('.input-value-min');
        const maxPrice = (parentElement as HTMLElement).querySelector('.input-value-max');
        (maxPriceInput as HTMLInputElement).value = `${value.max}`;
        (minPriceInput as HTMLInputElement).value = `${value.min}`;
        (minPrice as HTMLElement).innerText = `${value.min}`;
        (maxPrice as HTMLElement).innerText = `${value.max}`;
    }

    onChangeAllFilters(mainSection: Element | null, callback: () => void): void {
        this.onChangeFilters(FILTER_TYPE.CATEGORY, callback);
        this.onChangeFilters(FILTER_TYPE.BRAND, callback);
        this.onRangeInputsChange(mainSection, callback);
        this.onResetFiltersClick(callback);
    }

    updateFiltersQuantity(filtersQuantity: FiltersResultData): void {
        const categoryBlock = document.querySelector('.filters__category');
        const categoryItems = (categoryBlock as HTMLElement).querySelectorAll('.filter-item');
        const brandBlock = document.querySelector('.filters__brand');
        const brandItems = (brandBlock as HTMLElement).querySelectorAll('.filter-item');
        this.updateMultiRangeInputValue(this.priceBlock, filtersQuantity.price);
        this.updateMultiRangeInputValue(this.stockBlock, filtersQuantity.stock);
        this.updateFilterItemQuantity(categoryItems, filtersQuantity.category);
        this.updateFilterItemQuantity(brandItems, filtersQuantity.brand);
    }

    updateFilterItemQuantity(items: NodeListOf<Element>, filters: Record<string, number>): void {
        items.forEach((item) => {
            const filterInput = (item as HTMLElement).querySelector('.filter-item__input');
            const quantity = (item as HTMLElement).querySelector('.filter-item__founded');
            const filerValue = (filterInput as HTMLInputElement).value;

            if (Object.keys(filters).includes(filerValue)) {
                (quantity as HTMLElement).innerText = filters[filerValue].toString();
                item.classList.remove('not-active');
            } else {
                (quantity as HTMLElement).innerText = '0';
                item.classList.add('not-active');
            }
        });
    }
}

export default Filters;
