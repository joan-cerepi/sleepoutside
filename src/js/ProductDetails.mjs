import { setLocalStorage, getLocalStorage} from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        this.addToCartBtn = '';
    }

    init() {
        this.dataSource.findProductById(this.productId).then(product => {
            this.product = product;
            this.renderProductDetails(this.product, 'main');
            this.addToCartBtn = document.querySelector('#addToCart');
            this.addToCartBtn.addEventListener('click', this.addProductToCart.bind(this));
        });
    }

    renderProductDetails(product, selector) {
        const htmlTemplate = `
            <section class="product-detail">
                <h3>${product.Brand.Name}</h3>
                <h2 class="divider">${product.NameWithoutBrand}</h2>
                <img
                    class="divider"
                    src="${product.Image}"
                    alt="${product.NameWithoutBrand}
                >

                <p class="product-card__price">$${product.FinalPrice}</p>
                
                <p class="product__color">${product.Colors[0].ColorName}</p>

                <p class="product__description">${product.DescriptionHtmlSimple}</p>

                <div class="product-detail__add">
                    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
                </div>
            </section>
        `;
        const querySelector = document.querySelector(selector);
        querySelector.innerHTML = htmlTemplate;
    }

    addProductToCart() {
        const existingCart = getLocalStorage('so-cart');
        existingCart.push(this.product);
        setLocalStorage('so-cart', existingCart);
        window.location.reload();
    }
}