import apiFetch from "./fetch.js";

 async function getBookById(id, options = {}) {
const BASE_URL = `https://lenczewska-libraff-az-data.onrender.com/books/${id}`;

    let result = await apiFetch(BASE_URL, options.method || "GET", options.body, options.headers || {});
    console.log("api result:", result);
    return result;
}


export default getBookById;

