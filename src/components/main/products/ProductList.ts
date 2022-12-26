import Products from '../../../model/Products';
import './ProductList.css';

class ProductList {

    drawCards(element: Element | null): void {
        const productModel = new Products();
        const productsPromise = productModel.start();

        const ulProducts = document.createElement('ul');
        ulProducts.classList.add('items');
        (element as HTMLElement).append(ulProducts);

        productsPromise.then(
            function (result) {
                for (const key in result) {
                    const liItem = document.createElement('li');
                    ulProducts.appendChild(liItem);
                    liItem.classList.add('li-item');
                    liItem.classList.add(`item-${key}`);
                    const divProduct = document.createElement('div');
                    divProduct.classList.add('product');

                    for (const key2 in result[key]) {
                        const res = result[key];
                        if(key2 !== 'thumbnail' && key2 !== 'images' && key2 !== 'id'){
                            divProduct.innerHTML += `<p class="${key2}">${key2.toUpperCase()}: ${result[key][key2 as keyof typeof res]}</p>`;
                            liItem.appendChild(divProduct);
                            liItem.style.backgroundImage = `url('${result[key].images[0]}')`;
                        }
                    }
                    const divButtons = document.createElement('div');
                    divButtons.innerHTML = `<button class="button-left-${result[key].id}">ADD TO CART</button><button class="button-right-${result[key].id}">DETAILS</button>`;
                    liItem.appendChild(divButtons);
                    divButtons.classList.add('div-buttons');
                }
            },
            (error) => alert(error)
        );
    }
}

export default ProductList;
