import { IProduct } from '../../../types/product.model';
import './product-list.css';
import { PageIds } from '../../../constants';
import headerCounter from '../../header/headerCounts';
const headerCount = new headerCounter;
class ProductList {
    drawCards(element: Element | null, products: IProduct[]): void {
        headerCount.getHeaderBasket();
        headerCount.getHeaderSumBasket();
        const ulProducts = document.createElement('ul');
        ulProducts.classList.add('items');
        (element as HTMLElement).append(ulProducts);

        products.forEach((product) => {
            const liItem = document.createElement('li');
            ulProducts.appendChild(liItem);
            liItem.classList.add('li-item');
            liItem.setAttribute('data-value', `${product.id}`);
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
            liItem.innerHTML += `<div class="picture-item"><img src="${product.images[0]}" alt="image"></div>`;
        });

        this.onCardClick(ulProducts);
        this.onButtonClick(ulProducts);
        this.drawButtonStyle(ulProducts);
    }

    onCardClick(mainBlock: Element | null): void {

        //добавить клик по инфе с переходом
        const cards = mainBlock?.querySelectorAll('.li-item');
        const arrayCards = Array.from(cards as NodeListOf<HTMLElement>);

        const buttons = mainBlock?.querySelectorAll('.button-details');
        const arrayBasket = Array.from(buttons as NodeListOf<HTMLElement>);

        const description = mainBlock?.querySelectorAll('.product');
        const arrayDescription = Array.from(description as NodeListOf<HTMLElement>);

        arrayBasket.forEach((button) =>
            button.addEventListener('click', () => {
                const buttonId = arrayBasket.indexOf(button);
                const cardId = arrayCards[buttonId].getAttribute('data-value');
                window.location.hash = `${PageIds.ProductPage}/${cardId}`;
            })
        );

        arrayDescription.forEach((desc) =>
            desc.addEventListener('click', () => {
                const descId = arrayDescription.indexOf(desc);
                const cardId = arrayCards[descId].getAttribute('data-value');
                window.location.hash = `${PageIds.ProductPage}/${cardId}`;
            })
        );

    }

    onButtonClick(mainBlock: Element | null): void {

        headerCount.getHeaderBasket();
        headerCount.getHeaderSumBasket();
        const buttons = mainBlock?.querySelectorAll('.button-add');
        const arrayBasket = Array.from(buttons as NodeListOf<HTMLElement>);

        const cards = mainBlock?.querySelectorAll('.li-item');
        const arrayCards = Array.from(cards as NodeListOf<HTMLElement>);

        const prices = mainBlock?.querySelectorAll('.price');
        const arrayPrice = Array.from(prices as NodeListOf<HTMLElement>);


        arrayBasket.forEach((button) =>
            button.addEventListener('click', () => {
                const buttonId = arrayBasket.indexOf(button);
                const cardId = arrayCards[buttonId].getAttribute('data-value');
                const price = arrayPrice[buttonId].textContent;

                if (button.classList.contains("choosen") === false){
                    
                    localStorage.setItem(`cart ${cardId}`, String(cardId));
                    localStorage.setItem(`price ${cardId}`, String(price));
                    button.classList.add("choosen");
                    button.textContent = 'DROP FROM CART';
                    headerCount.getHeaderBasket();
                    headerCount.getHeaderSumBasket();
                } else {

                    button.classList.remove("choosen");
                    button.textContent = 'ADD TO CART';
                    localStorage.removeItem(`cart ${cardId}`);
                    localStorage.removeItem(`price ${cardId}`);
                    headerCount.getHeaderBasket();
                    headerCount.getHeaderSumBasket();
                }

            })
        );
    }

    drawButtonStyle(mainBlock: Element | null): void {
        const buttons = mainBlock?.querySelectorAll('.button-add');
        const arrayBasket = Array.from(buttons as NodeListOf<HTMLElement>);
        const cards = mainBlock?.querySelectorAll('.li-item');
        const arrayCards = Array.from(cards as NodeListOf<HTMLElement>);

        if (localStorage.length > 0) {
            arrayBasket.forEach((button) => {
                const buttonId = arrayBasket.indexOf(button);
                const cardId = arrayCards[buttonId].getAttribute('data-value');
                for (let i = 0; i < localStorage.length; i++) {
                    if (localStorage.key(i) === `cart ${cardId}`) {
                        button.classList.add("choosen");
                        button.textContent = 'DROP FROM CART';
                    }
                }
            });
        }
    }

    renderEmptyBlock(element: Element | null): void {
        (element as HTMLElement).innerHTML = '<p class="empty-list">No products were found</p>';
    }
}

export default ProductList;
