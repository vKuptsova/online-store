import { Product } from '../types/product.model';

export default class Store {
    private static products: Product[];

    constructor() {}

    static setProducts(products: Product[]) {
        Store.products = products;
    }

    static getProducts(): Product[] {
        return Store.products;
    }
}
