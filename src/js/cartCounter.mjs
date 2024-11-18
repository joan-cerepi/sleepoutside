import { getLocalStorage } from './utils.mjs';

function itemCounterTemplate(itemNumber) {
    return `
      <div class="item-counter">
        <span class="counter-num">${itemNumber}</span>
      </div>
    `;
  }
  
  export default function itemCounter(key) {
    const numOfItems = getLocalStorage(key).length || '';
    const itemCounterHTML = itemCounterTemplate(numOfItems);
    const cart = document.querySelector('.cart');
    cart.innerHTML += itemCounterHTML;
  }