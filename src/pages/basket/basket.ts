import Page from '../../templates/page';
import API from '../../api';
import { IProduct } from '../../types/product.model';
import './basket.css';
import headerCounter from '../../components/header/headerCounts';
const headerCount = new headerCounter;

const summary = `<div class="summary">
     <form type="text" action="">
         <h2>Summary</h2>
         <p id="product-quantity"></p>
         <p id="total-cost"></p>
         <input type="text" id="promocode-placeholder" placeholder="Enter promo code">
         <input type="submit" value="BUY NOW">
     </form>
 </div>`;

const createBasketItemMarkup = ({
    category,
    brand,
    title,
    description,
    discountPercentage,
    rating,
    stock,
    price,
    images,
}: IProduct) => {
    return `<li class="basket-item">
            <div class="item-info">
                <div class='image-basket'><img src='${images[0]}' alt='${title}'></div>
                <div class='main-product-info'>
                    <p class="title-item-basket">${title}</p>
                    <hr>
                    <div class="item-descriptions">
                        <p>${description}</p>
                    </div>
                    <div class="item-indicators">
                        <p>Rating: ${rating}</p>
                        <p>Discount:  ${discountPercentage}</p>
                    </div>
                </div>
            </div>
            <div class="item-other">
                <p class='stock-basket'>Stock: ${stock}</p>
                <div class="item-counter">
                    <div class="circle-plus"><p>+</p></div>
                    <div class="number-items">1</div>
                    <div class="circle-minus"><p>-</p></div>
                </div>
                <p class='price-basket'>Price: ${price}</p>
            </div>
        </li>`;
};
class BasketPage extends Page {
    public api: API;
    constructor(id: string) {
        super(id);
        this.api = new API();
    }

    render() {
        const basketSection = document.createElement("div");
        basketSection.classList.add('basket-section');
        const productsInCart = document.createElement("div");
        productsInCart.classList.add('products-in-cart');
        productsInCart.innerHTML = `<div class="basket-header">
                <h2>Products In Cart</h2>
                 <div class="paginator">
                     <p class="limit-items-on-page">Limit:</p>
                     <p class="page-number">Page:
                         <button class="prev-page" type="button">&#60;</button>
                         <span>1</span>
                         <button class="next-page" type="button">&#62;</button>
                     </p>
                 </div>
             </div>`;
        const ulBasketList = document.createElement("ul");
        ulBasketList.classList.add('basket-product-list');
        basketSection.innerHTML += summary;
        basketSection.append(productsInCart);
        productsInCart.append(ulBasketList);

        if (localStorage.length > 0){
            for (let i = 0; i < localStorage.length; i++) {
                if (/(cart [0-9])/.test(String(localStorage.key(i))) === true) {
                    this.api.getProductById(`${localStorage.getItem(String(localStorage.key(i)))}`).then((product) => {
                        ulBasketList.innerHTML += createBasketItemMarkup(product);
                        headerCount.getHeaderBasket();
                        headerCount.getHeaderSumBasket();
                        this.onButtonsPlusMinusClick(ulBasketList);
                        this.drawInfoCountItem(ulBasketList);
                    });
                }
            }
        } else {
            productsInCart.innerHTML = "There is no products in cart."
        }
        this.container.append(basketSection);
        return this.container;
    }

    onButtonsPlusMinusClick(mainBlock: Element | null): void {
        const buttonsPlus = mainBlock?.querySelectorAll('.circle-plus');
        const arrayButtonsPlus = Array.from(buttonsPlus as NodeListOf<HTMLElement>);
        const basketPrice = mainBlock?.querySelectorAll('.price-basket');
        const arrayBasketPrices = Array.from(basketPrice as NodeListOf<HTMLElement>);
        const numberItems = mainBlock?.querySelectorAll('.number-items');
        const arrayNumberItems = Array.from(numberItems as NodeListOf<HTMLElement>);
        const buttonsMinus = mainBlock?.querySelectorAll('.circle-minus');
        const arrayButtonsMinus = Array.from(buttonsMinus as NodeListOf<HTMLElement>);
        const stock = mainBlock?.querySelectorAll('.stock-basket');
        const arrayStock = Array.from(stock as NodeListOf<HTMLElement>);
        const titles = mainBlock?.querySelectorAll('.title-item-basket');
        const arrayTitle = Array.from(titles as NodeListOf<HTMLElement>);
        

        arrayButtonsPlus.forEach((button) =>
            button.addEventListener('click', () => {
                const buttonId = arrayButtonsPlus.indexOf(button);
                const basketItemPrice = arrayBasketPrices[buttonId].textContent;
                const choosenNumberItem = arrayNumberItems[buttonId];
                localStorage.setItem(`cart basket ${arrayTitle[buttonId].textContent} ${String(String(Number(choosenNumberItem.textContent) + 1))}`, String(buttonId));
                localStorage.setItem(`price basket ${arrayTitle[buttonId].textContent} ${String(String(Number(choosenNumberItem.textContent) + 1))}`, String(basketItemPrice));
                if (Number(choosenNumberItem.textContent) < Number(String((arrayStock[buttonId].textContent)).slice(7))) {
                    localStorage.setItem(`choosenNumberItem ${buttonId}`, String(Number(choosenNumberItem.textContent) + 1));
                    choosenNumberItem.innerHTML = String(localStorage.getItem(`choosenNumberItem ${buttonId}`));
                }
                headerCount.getHeaderBasket();
                headerCount.getHeaderSumBasket();
            })
        );

        arrayButtonsMinus.forEach((button) =>
            button.addEventListener('click', () => {
                const buttonId = arrayButtonsMinus.indexOf(button);
                const choosenNumberItem = arrayNumberItems[buttonId];
                localStorage.removeItem(`cart basket ${arrayTitle[buttonId].textContent} ${String(String(Number(choosenNumberItem.textContent)))}`);
                localStorage.removeItem(`price basket ${arrayTitle[buttonId].textContent} ${String(String(Number(choosenNumberItem.textContent)))}`);
                if(Number(choosenNumberItem.textContent) > 1){
                    localStorage.setItem(`choosenNumberItem ${buttonId}`, String(Number(choosenNumberItem.textContent) - 1));
                    choosenNumberItem.innerHTML = String(Number(localStorage.getItem(`choosenNumberItem ${buttonId}`)));
                }
                headerCount.getHeaderBasket();
                headerCount.getHeaderSumBasket();
            })
        );
    }

    drawInfoCountItem(mainBlock: Element | null): void {
        const numberItems = mainBlock?.querySelectorAll('.number-items');
        const arrayNumberItems = Array.from(numberItems as NodeListOf<HTMLElement>);

        if (localStorage.length > 0) {
            arrayNumberItems.forEach((count) => {
                for (let i = 0; i < localStorage.length; i++) {
                    if (localStorage.key(i) === `choosenNumberItem ${arrayNumberItems.indexOf(count)}`) {
                        count.innerHTML = String(Number(localStorage.getItem(`choosenNumberItem ${arrayNumberItems.indexOf(count)}`)));
                    }
                }
            });
        }
    }

}

export default BasketPage;