// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const item = localStorage.getItem(key);
  
  if(item){
    return JSON.parse(localStorage.getItem(key) || []);
  } else {
    return [];
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
let cart = JSON.parse(localStorage.getItem(key)) || [];

if(!Array.isArray(cart)) {
  cart = [];
}

cart.push(data);

localStorage.setItem(key, JSON.stringify(cart));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);

  if(clear) {
    parentElement.innerHTML = "";
  }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
