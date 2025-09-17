const BASE_URL = 'https://lenczewska-libraff-az-data.onrender.com/books';

async function getAllBooks() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data; // предполагаем, что возвращается объект с массивом "books"
}

export default getAllBooks;
