import apiFetch from "./fetch.js";

 async function getBookById(id, options = {}) {
const BASE_URL = `https://lenczewska-libraff-az-data.onrender.com/books/${id}`;

    return await apiFetch(BASE_URL, options.method || "GET", options.body, options.headers || {});
}


export default getBookById;

