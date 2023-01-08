import { FILTER_TYPE } from '../constants';

export interface FilterWithQuantity {
    value: string;
    quantity: number;
}

export interface IFiltersOptions {
    categories: FilterWithQuantity[];
    brands: FilterWithQuantity[];
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

export interface FiltersResultData {
    category: Record<string, number>;
    brand: Record<string, number>;
    price: Price;
    stock: Stock;
}
