import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { loadHeaderFooter, getParams } from './utils.mjs';

loadHeaderFooter();
const category = getParams('category');
const dataSource = new ProductData();
const selector = document.querySelector('.product-list');
const productList = new ProductListing(category, dataSource, selector);
productList.init();

document.getElementById("searchBtn").addEventListener("click", function () {
    let productSearchTerm = document.getElementById("productSearchTerm").value;
    const myList = new ProductListing(category, dataSource, selector);
    myList.searchProd(productSearchTerm);
} );