import { loadHeaderFooter, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();
const category = getParams("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productList = new ProductListing(category, dataSource, element);

const head = document.getElementById('top-products');
head.textContent = `Top Products: ${category}`

productList.init();