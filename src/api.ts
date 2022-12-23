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
        return fetch(PRODUCTS_URL, { method: 'get' })
            .then(checkStatus)
            .then((response) => response.json())
            .catch((err) => {
                throw err;
            });
    }
}
