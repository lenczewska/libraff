import card from './components/card.js';
import getAllBooks from './service/getAllBooks.js';

const booksContainer = document.getElementById('dayBooks');

async function renderBooks() {
  try {
    const data = await getAllBooks(); // fetch с Render
    const booksArray = Array.isArray(data) ? data : data.books; // если массив, используем напрямую
    booksContainer.innerHTML = "";

    booksArray.forEach(book => {
      booksContainer.innerHTML += card(book);
    });
  } catch (err) {
    console.error("Ошибка загрузки книг:", err);
    booksContainer.innerHTML = "<p>Ошибка загрузки данных</p>";
  }
}

renderBooks()
