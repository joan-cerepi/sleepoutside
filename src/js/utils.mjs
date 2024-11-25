// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const cartItem = localStorage.getItem(key);
  if (cartItem) {
    return JSON.parse(localStorage.getItem(key));
  }else{
    return [];
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  const htmlString =  list.map(templateFn);
  if (clear === true){
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}