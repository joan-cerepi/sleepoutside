import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  const addBtn = document.querySelectorAll('.add-qty');
  const subBtn = document.querySelectorAll('.sub-qty');
  if (addBtn && subBtn) {
    addBtn.forEach(btn => btn.addEventListener('click', addQuantity));
    subBtn.forEach(btn => btn.addEventListener('click', subtractQuantity));
  }
  removeItems('so-cart');
}

function operation(event, op) {
  const dataId = event.target.dataset.id;
  const cartItems = getLocalStorage('so-cart');
  const currentIndex = cartItems.findIndex(item => dataId === item.Id);

  switch (op) {
    case 'add':
      cartItems[currentIndex].qty++;
      break;
    case 'subtract':
      if (cartItems[currentIndex].qty > 1) cartItems[currentIndex].qty--;
      break;
  }
  setLocalStorage('so-cart', cartItems);
}

function addQuantity(event) {
  operation(event, 'add');
}

function subtractQuantity(event) {
  operation(event, 'subtract');
}

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.qty} <span class="add-qty" data-id="${item.Id}">&#43;</span> <span class="sub-qty" data-id="${item.Id}">&minus;</span></p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <div class="cart-card__del-btn">
    <a href="#" id="removeFromCart" data-id="${item.Id}">&#9746;</a>
    </div>
  </li>`;

  return newItem;
}

function removeItems(key) {
  document.querySelectorAll('#removeFromCart').forEach((element) => {
    element.addEventListener('click', function (event) {
      if (event.target.id === 'removeFromCart') {
        const prodId = event.target.dataset.id;
        removeFromCart(key, prodId);
      }
    });
  });
}
function removeFromCart(key, prodId) {
  let cartItems = getLocalStorage(key);
  const index = cartItems.findIndex((item) => item.Id === prodId);

  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  // Update local storage with the new cart items
  setLocalStorage(key, cartItems);
}

renderCartContents();