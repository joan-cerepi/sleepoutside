import { renderListWithTemplate } from './utils.mjs';

const productCardTemplate = (product) => {
    return `
        <li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img
                    src="${product.Image}"
                    alt="Image of ${product.NameWithoutBrand}
                >
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
        </li>
    `;
};

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        const filteredList = this.filterList(
            ['880RR', '985RF', '985PR', '344YJ'],
            list
        )
        this.renderList(filteredList);
    }

    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
    }

    filterList(allowedItems, list) {
        const newList = list.filter(item => allowedItems.includes(item.Id));
        return newList;
    }
}