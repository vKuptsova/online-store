import Products from './Products';

class ProductList {

    drowCards(element: Element | null): void {
        const data = new Products();
        const card = data.start();

        const divProducts = document.createElement('ul');
        divProducts.classList.add('items');
        (element as HTMLElement).append(divProducts);

        card.then(
            function (result) {
                for (const key in result) {
                    const liItem = document.createElement('li');
                    divProducts.appendChild(liItem);
                    liItem.classList.add('li-item');
                    liItem.classList.add(`item-${key}`);

                    for (const key2 in result[key]) {
                        if(key2 !== 'thumbnail' && key2 !== 'images' && key2 !== 'id'){
                            liItem.innerHTML += `<p class="${key2}">${key2.toUpperCase()}: ${result[key][key2]}</p>`;
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
