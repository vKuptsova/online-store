import './filter.css';
import { IFiltersOptions } from '../../types/filters-options.model';

const createFiltersMainMarkup = () => {
    return `<div class="filters__button">
                <button class="button-filter button-filter--reset" type="button">Reset filters</button>
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

const createFilterMarkup = (name: string) => {
    return `<li class="filter-item">
             <input id="filter-${name}" class="filter-item__input" type="checkbox" value="${name}">
             <label class="filter-item__label" for="filter-${name}">${name}</label>
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

class Filters {
    init({ categories, brands, price, stock }: IFiltersOptions, mainBlock: Element | null): void {
        this.appendFiltersBlock(mainBlock);

        const filtersCategoryList = (mainBlock as HTMLElement).querySelector('.filters-list--category');
        const filtersBrandList = (mainBlock as HTMLElement).querySelector('.filters-list--brand');
        const filtersPriceBlock = (mainBlock as HTMLElement).querySelector('.filters__price');
        const filtersStockBlock = (mainBlock as HTMLElement).querySelector('.filters__stock');

        const filtersCategoryMarkup = categories.map((name) => createFilterMarkup(name)).join(`\n`);
        const filtersBrandsMarkup = brands.map((name) => createFilterMarkup(name)).join(`\n`);
        (filtersCategoryList as HTMLElement).innerHTML = filtersCategoryMarkup;
        (filtersBrandList as HTMLElement).innerHTML = filtersBrandsMarkup;
        (filtersPriceBlock as HTMLElement).innerHTML = createRangeSliderMarkup(price.min, price.max, true);
        (filtersStockBlock as HTMLElement).innerHTML = createRangeSliderMarkup(stock.min, stock.max, false);

        this.onMultiRangeChange(filtersPriceBlock);

        this.onMultiRangeChange(filtersStockBlock);
    }

    appendFiltersBlock(mainBlock: Element | null): void {
        const filtersBlock = document.createElement('section');
        (mainBlock as HTMLElement).append(filtersBlock);
        filtersBlock.classList.add('filters');
        filtersBlock.innerHTML = createFiltersMainMarkup();
    }

    onMultiRangeChange(parent: Element | null): void {
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
        };
    }
}

export default Filters;
