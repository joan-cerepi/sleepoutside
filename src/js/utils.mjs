// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const item = localStorage.getItem(key);
  return JSON.parse(item || '[]');
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  window.location.reload();
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn, 
  parentElement, 
  list, 
  position = 'afterbegin', 
  clear = false
) {
  if (clear) parentElement.innerHTML = '';
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate( 
  template,
  parentElement,
  data, 
  position = 'afterbegin', 
  callback,
  clear = false
) {
  if (clear) parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML(position, template);

if(callback) {
  callback(data);
}
}

export async function loadHeaderFooter() {
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footer = document.getElementById("footer")
  const header = document.getElementById("header")

  renderWithTemplate(headerTemplate, header)
  renderWithTemplate(footerTemplate, footer)
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text()
  return template;
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}