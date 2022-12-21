import Store from './models/store';

const PRODUCTS_URL = `https://dummyjson.com/products?limit=100`;

const checkStatus = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
};

export default class API {
    getProducts() {
        return this.load()
            .then((response) => response.json())
            .then((response) => {
                Store.setProducts(response.products);
            });
    }

    load() {
        return fetch(PRODUCTS_URL, { method: 'get' })
            .then(checkStatus)
            .catch((err) => {
                throw err;
            });
    }
}
