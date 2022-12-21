import Page from '../../templates/page';
import { IProduct } from '../../types/product.model';
import './product.css';
import API from '../../api';

const createProductMarkup = ({
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
    return `<h2>${title}</h2>
        <div class='product-block'>  
            <div class='product__content'>
                <ul class='product__content-images'></ul>
                <img class='product__main-image' src='${images[0]}' alt='${title}' width='400px' height='260px'>
                <ul class='product__content-detail'>
                    <li>
                        <h3>Description</h3>
                        <p>${description}</p>  
                    </li>
                    <li>
                        <h3>Discount Percentage</h3>
                        <p>${discountPercentage}</p>
                    </li>
                    <li>
                        <h3>Rating</h3>
                        <p>${rating}</p>
                    </li>
                    <li>
                        <h3>Stock</h3>
                        <p>${stock}</p>
                    </li>
                    <li>
                        <h3>Brand</h3>
                        <p>${brand}</p>
                    </li>
                    <li>
                        <h3>Category</h3>
                        <p>${category}</p>
                    </li>
                </ul>
            </div>
            <div class='product__price'>
                <span class='product__price-title'>${price}</span>
                <button class='product__price-button-add' type='button'>Add to card</button>
                <button class='product__price-button-buy' type='button'>Buy now</button> 
            </div>
        </div>`;
};

const createProductImagesMarkup = (image: string): string => {
    return `<li class='product__content-image'><img src='${image}' alt='${image}' width='120px' height='80px'></li>`;
};

class ProductPage extends Page {
    public api: API;
    public productId: string;
    constructor(id: string, productId: string) {
        super(id);
        this.productId = productId;
        this.api = new API();
    }

    render() {
        this.api.getProductById(this.productId).then((product) => {
            const productSection = document.createElement('article');
            productSection.classList.add('product');
            (productSection as HTMLElement).innerHTML = createProductMarkup(product);
            const productContentImages = productSection.querySelector('.product__content-images');
            const imagesMarkup = product.images.map((item: string) => createProductImagesMarkup(item)).join(`\n`);
            (productContentImages as HTMLElement).innerHTML = imagesMarkup;
            this.container.append(productSection);
            this.onProductImageClick(productSection);
        });

        return this.container;
    }

    onProductImageClick(productSection: HTMLElement): void {
        const images = productSection.querySelectorAll('.product__content-image');
        const mainImage = productSection.querySelector('.product__main-image');
        images.forEach((item) =>
            item.addEventListener('click', (event) => {
                (mainImage as HTMLImageElement).src = (event.target as HTMLImageElement)?.currentSrc;
            })
        );
    }
}

export default ProductPage;
