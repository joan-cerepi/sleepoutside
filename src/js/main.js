import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import Alert from './Alert.js';
import { loadHeaderFooter } from './utils.mjs';

const alert = new Alert();
alert.displayAlerts();
const dataSource = new ProductData('tents');
const selector = document.querySelector('.product-list');
const productList = new ProductListing('tents', dataSource, selector);
productList.init();
loadHeaderFooter();