import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Add a product to the cart
function addProductToCart(product) {
  // Retrieve current cart from localStorage or initialize as an empty array
  let cart = getLocalStorage("so-cart") || [];

  // Ensure that cart is an array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add the new product to the cart array
  cart.push(product);

  setLocalStorage("so-cart", cart);
}

// Event handler for the Add to Cart button
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);

  // Add the product to the cart
  addProductToCart(product);
}

// Add event listener to the Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
