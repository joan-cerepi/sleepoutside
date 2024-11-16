import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
          <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${[product.Name]}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
          </a>
        </li>`
}

export default class ProductList{
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    filterProducts(list) {
        const tentIds = ['880RR', '985RF', '985PR', '344YJ'];
        let filterList = list.filter(product => tentIds.includes(product.Id));
        
        return filterList;
    }

    async init() {
        const list = await this.dataSource.getData();
        const newList = this.filterProducts(list);
        this.renderList(newList);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}
