import card from './components/card.js';
import getAllBooks from './service/getAllBooks.js';
import { updateWishlistCounter } from './utils/favUtils.js';

const booksContainer = document.getElementById('dayBooks');

async function renderBooks() {
  try {
    const data = await getAllBooks(); 
    const booksArray = Array.isArray(data) ? data : data.books;
    booksContainer.innerHTML = "";

    booksArray.forEach(book => {
      booksContainer.innerHTML += card(book);
    });
    
    updateWishlistCounter();
  } catch (err) {
    console.error("Ошибка загрузки книг:", err);
    booksContainer.innerHTML = "<p>Ошибка загрузки данных</p>";
  }
}

renderBooks()
