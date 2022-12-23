export interface IFiltersOptions {
    categories: string[];
    brands: string[];
    price: Price;
    stock: Stock;
}

type Price = {
    min: number;
    max: number;
};

type Stock = {
    min: number;
    max: number;
};
