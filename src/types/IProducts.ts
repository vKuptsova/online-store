import {Product} from './product.model'

export interface IProducts {
    limit: number;
    products: Array<Product>;
    skip: number;
    total: number;
}