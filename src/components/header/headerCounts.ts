export default class headerCounter {
    getHeaderBasket() {
        const basketTotal = document.querySelector('.header_basket-total');
        let count = 0;
        if (localStorage.length > 0){
            for (let i = 0; i < localStorage.length; i++) {
                if (/(cart)/.test(String(localStorage.key(i))) === true) {
                    count += 1;
                }
            }
        }

        return (basketTotal as HTMLElement).innerHTML = String(count);
    }

    getHeaderSumBasket() {
        const basketSum = document.querySelector('.header_price-total');
        let count = 0;
        if (localStorage.length > 0){
            for (let i = 0; i < localStorage.length; i++) {
                if (/(price)/.test(String(localStorage.key(i))) === true) {
                    count += Number(String(localStorage.getItem(String(localStorage.key(i)))).slice(7));
                }
            }
        }

        return (basketSum as HTMLElement).innerHTML = String(count);
    }

}
