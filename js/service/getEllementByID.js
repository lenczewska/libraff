import apiFetch from "./fetch";

 async function getBook(id, options = {}) {
const BASE_URL = `https://lenczewska-libraff-az-data.onrender.com/books/${id}`;

    return await apiFetch(BASE_URL, options.method || "GET", options.body, options.headers || {});
}


export default getBook;

