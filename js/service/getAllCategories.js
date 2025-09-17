import fetch from './fetch.js';

const BASE_URL = `https://lenczewska-libraff-az-data.onrender.com/books/${id}`;

export default async function getAllCategs() {
    return await fetch(BASE_URL);
}