import { IProduct } from '../../../types/product.model';
import './ProductList.css';

class ProductList {
    drawCards(element: Element | null, products: IProduct[]): void {
        const ulProducts = document.createElement('ul');
        ulProducts.classList.add('items');
        (element as HTMLElement).append(ulProducts);

        products.forEach((product) => {
            const liItem = document.createElement('li');
            ulProducts.appendChild(liItem);
            liItem.classList.add('li-item');
            liItem.classList.add(`item-${product.id}`);
            const divProduct = document.createElement('div');
            divProduct.classList.add('product');

            for (const key2 in product) {
                const res = product;
                if (key2 !== 'thumbnail' && key2 !== 'images' && key2 !== 'id') {
                    divProduct.innerHTML += `<p class="${key2}">${key2.toUpperCase()}: ${
                        product[key2 as keyof typeof res]
                    }</p>`;
                    liItem.appendChild(divProduct);
                }
            }
            const divButtons = document.createElement('div');
            divButtons.innerHTML = `<button class="button-add">ADD TO CART</button><button class="button-details">DETAILS</button>`;
            liItem.appendChild(divButtons);
            divButtons.classList.add('div-buttons');
            liItem.innerHTML += `<img src="${product.images[0]}" alt="image">`;
        });
    }

    renderEmptyBlock(element: Element | null): void {
        (element as HTMLElement).innerHTML = '<p class="empty-list">No products were found</p>';
    }
}

export default ProductList;
