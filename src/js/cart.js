import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");
    removeItems("so-cart");
    displayTotalPrice(cartItems);
  }
}

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <div class="cart-card__del-btn">
    <a href="#" id="removeFromCart" data-id="${item.Id}">&#9746;</a>
    </div>
  </li>`;

  return newItem;
}

function removeItems(key) {
  document.querySelectorAll("#removeFromCart").forEach((element) => {
    element.addEventListener("click", function (event) {
      if (event.target.id === "removeFromCart") {
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
  // Re-render the cart contents to reflect the changes
  window.location.reload();
}

function displayTotalPrice(cartItems) {
  const totalPrice = cartItems
    .reduce((total, item) => total + item.FinalPrice, 0)
    .toFixed(2);
  const totalPriceElement = document.createElement("div");
  totalPriceElement.className = "cart-total";
  totalPriceElement.innerHTML = `<p>Total Price: $${totalPrice}</p>`;
  document.querySelector("main").appendChild(totalPriceElement);
}

renderCartContents();