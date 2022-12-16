export interface FiltersOptions {
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
