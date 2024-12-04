import ExternalServices from './ExternalServices.mjs';
import ProductListing from './ProductList.mjs';
import Alert from './Alert.js';
import { loadHeaderFooter } from './utils.mjs';

const alert = new Alert();
alert.displayAlerts();
const dataSource = new ExternalServices('tents');
const selector = document.querySelector('.product-list');
const productList = new ProductListing('tents', dataSource, selector);
productList.init();
loadHeaderFooter();