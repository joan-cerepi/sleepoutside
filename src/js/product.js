import { getParams } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ExternalServices('tents');
const productId = getParams('product');
const product = new ProductDetails(productId, dataSource);
product.init();