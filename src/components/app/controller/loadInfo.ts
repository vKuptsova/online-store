import './loadInfo.css';

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
        divItem.classList.add(`item-${data.products[i].id}`)
        let divProduct = document.createElement("div");
        divProduct.classList.add("product");

        for (let key in item){
            if (key !== 'thumbnail' && key !== 'images' && key !== 'id') {
            divProduct.innerHTML += `<div class="${key}">${key.toUpperCase()}: ${data.products[i][key]}</div>`;
            divItem.appendChild(divProduct);
            divItem.style.backgroundImage = `url('${data.products[i].images[0]}')`;
            }
        }
    }
}

export default getProducts();