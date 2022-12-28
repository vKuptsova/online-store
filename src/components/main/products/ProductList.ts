import API from '../../../api';
import { IProduct } from '../../../types/product.model';
import './ProductList.css';

class ProductList {

    drawCards(element: Element | null): void {
        const productModel = new API();
        const productsPromise = productModel.getProducts();

        const ulProducts = document.createElement('ul');
        ulProducts.classList.add('items');
        (element as HTMLElement).append(ulProducts);

        productsPromise.then(
            function (result) {
                const result2: Array<IProduct> = result.products;
                for (const key in result2) {
                    const liItem = document.createElement('li');
                    ulProducts.appendChild(liItem);
                    liItem.classList.add('li-item');
                    liItem.classList.add(`item-${key}`);
                    const divProduct = document.createElement('div');
                    divProduct.classList.add('product');

                    for (const key2 in result2[key]) {
                        const res = result2[key];
                        if(key2 !== 'thumbnail' && key2 !== 'images' && key2 !== 'id'){
                            divProduct.innerHTML += `<p class="${key2}">${key2.toUpperCase()}: ${result2[key][key2 as keyof typeof res]}</p>`;
                            liItem.appendChild(divProduct);
                        }
                    }
                    const divButtons = document.createElement('div');
                    divButtons.innerHTML = `<button class="button-add">ADD TO CART</button><button class="button-details">DETAILS</button>`;
                    liItem.appendChild(divButtons);
                    divButtons.classList.add('div-buttons');
                    liItem.innerHTML += `<img src="${result2[key].images[0]}" alt="image">`;
                }
            },
            (error) => alert(error)
        );
    }
}

export default ProductList;
