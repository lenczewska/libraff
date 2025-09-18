import fetchData from "./fetch.js";

const BASE_URL = 'https://lenczewska-libraff-az-data.onrender.com/books';

 async function postBook(newBook) {
  return await fetchData(BASE_URL, "POST", newBook);
}

 async function patchBook(id, partialUpdate) {
  return await fetchData(`${BASE_URL}/${id}`, "PATCH", partialUpdate);
}

 async function deleteBook(id) {
  return await fetchData(`${BASE_URL}/${id}`, "DELETE");
}

export {
 postBook,
 patchBook,
 deleteBook
} 