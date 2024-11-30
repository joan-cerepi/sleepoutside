import { renderListWithTemplate } from "./utils.mjs";

const productCardTemplate = (product) => {
  return `
        <li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img
                    src="${product.Image}"
                    alt="Image of ${product.NameWithoutBrand}"
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
    this.sortOption = "name"; // Default sort option
  }

  async init() {
    const list = await this.dataSource.getData();
    const filteredList = this.filterList(
      ["880RR", "985RF", "985PR", "344YJ"],
      list,
    );
    this.renderList(filteredList);
    this.addSortEventListeners();
  }

  renderList(productList) {
    // Clear the existing list
    this.listElement.innerHTML = "";
    const sortedList = this.sortList(productList);
    renderListWithTemplate(productCardTemplate, this.listElement, sortedList);
  }

  filterList(allowedItems, list) {
    return list.filter((item) => allowedItems.includes(item.Id));
  }

  sortList(list) {
    if (this.sortOption === "name") {
      return list.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (this.sortOption === "price") {
      return list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    return list;
  }

  addSortEventListeners() {
    document
      .querySelector("#sortSelect")
      .addEventListener("change", (event) => {
        this.sortOption = event.target.value;
        this.init();
      });
  }
}