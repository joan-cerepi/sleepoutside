const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  const newRes = res.json();
  if (res.ok) {
    return newRes;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async searchProduct(proName, category) {
    console.log(proName);
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    //console.log(data)
    const results = data.Result.filter((searchResult) => {
      if(proName === "") {
        return searchResult;
      } else if (searchResult.Name.toLowerCase().includes(proName.toLowerCase()) || 
            searchResult.FinalPrice.toString().includes(proName)) {
        return searchResult;
      }
    });
    //console.log(results);
    return results;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}