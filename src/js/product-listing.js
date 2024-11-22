import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { loadHeaderFooter, getParams } from './utils.mjs';

loadHeaderFooter();
const category = getParams('category');
const dataSource = new ProductData();
const selector = document.querySelector('.product-list');
const productList = new ProductListing(category, dataSource, selector);
productList.init();