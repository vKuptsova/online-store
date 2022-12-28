import {IProducts} from '../types/IProducts';
import {Product} from '../types/product.model';

const url = 'https://dummyjson.com/products?limit=100';

class getProducts {
    start() {
        async function gProd() {
            const res = await fetch(url);
            const data: IProducts = await res.json();
            const product: Array<Product> = data.products;
            return product;
        }
        return gProd();
    }
}

export default getProducts;
