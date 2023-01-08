import { FILTER_TYPE } from '../constants';

export interface IFiltersOptions {
    categories: string[];
    brands: string[];
    price: Price;
    stock: Stock;
}

export type Price = {
    min: number;
    max: number;
};

export type Stock = {
    min: number;
    max: number;
};

export interface FiltersValues {
    category: string[];
    brand: string[];
    searchValue: string;
    price: Price;
    stock: Stock;
}

export type FilterValue = FILTER_TYPE.CATEGORY | FILTER_TYPE.BRAND;
export type FilterMultiRangeValue = FILTER_TYPE.PRICE | FILTER_TYPE.STOCK;
