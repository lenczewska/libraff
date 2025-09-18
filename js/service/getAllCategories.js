import fetch from './fetch.js';

const BASE_URL = `https://lenczewska-libraff-az-data.onrender.com/books/`;

async function getAllCategories() {
    return await fetch(BASE_URL);
}

export default getAllCategories;