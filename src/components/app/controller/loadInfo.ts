async function getProducts() {
    const url:string = `https://dummyjson.com/products?limit=100`;
    const res = await fetch(url);
    const data = await res.json();
    const product: Array<object> = data.products;
    
    const bodyInfo = document.getElementsByClassName("main__block")[0];
    const divProducts = document.createElement("div");
    bodyInfo.appendChild(divProducts);
    divProducts.classList.add("products");

    for (let i:number = 0; i<product.length; i++){
        let item = product[i];
        const divItem = document.createElement("div");
        divProducts.appendChild(divItem);
        divItem.classList.add("div-item");

        for (let key in item){
            let divProduct = document.createElement("div");
            divProduct.innerHTML = `<div class="${key}">${data.products[i][key]}</div>`;
            divItem.appendChild(divProduct);
            divProduct.classList.add(`product-${data.products[i].id}`);
        }
    }
}

export default getProducts();