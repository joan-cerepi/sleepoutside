import { getLocalStorage } from './utils.mjs';
// Function to render the cart contents on the page
function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  if (!Array.isArray(cartItems)) {
    console.warn('Cart items is not an array.');
    return;
  }

  const productList = document.querySelector('.product-list');
  if (!productList) {
    console.error('Product list element not found');
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join('');

  updateCartTotal(cartItems);
}

// Template for each cart item
function cartItemTemplate(item) {
  return `<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img src='${item.Image}' alt='${item.Name}' />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${item.Colors[0]?.ColorName || 'No color available'}</p>
    <p class='cart-card__quantity'>qty: ${item.Quantity || 1}</p>
    <p class='cart-card__price'>$${item.FinalPrice?.toFixed(2) || '0.00'}</p>
  </li>`;
}

// Calculate total cost of cart items
function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + (item.FinalPrice || 0), 0);
}

// Update the cart total and visibility of cart footer
function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotalElement = document.querySelector('.cart-total');

  if (!cartFooter || !cartTotalElement) {
    console.error('Cart footer or total element not found');
    return;
  }

  if (cartItems.length > 0) {
    const total = calculateCartTotal(cartItems);
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove('hide');
  } else {
    cartFooter.classList.add('hide');
  }
}

// Initialize cart rendering on page load
document.addEventListener('DOMContentLoaded', renderCartContents);
