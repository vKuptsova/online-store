import {IProduct} from './product.model'

export interface IProducts {
    limit: number;
    products: Array<IProduct>;
    skip: number;
    total: number;
}