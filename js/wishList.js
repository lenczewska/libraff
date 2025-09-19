import categPopUp from "./components/categPopUp.js";
import getAllBooks from "./service/getAllBooks.js";
import wishlistCard from "./components/wishlistCard.js";
import { addFavorite, removeFavorite, isFavorite, updateWishlistCounter } from "./utils/favUtils.js";

window.categPopUp = categPopUp;
const mainSec = document.getElementById("mainSec");

async function initPage() {
    try {
        const delay = new Promise(resolve => setTimeout(resolve, 500));
        const [booksData] = await Promise.all([getAllBooks(), delay]);

        const books = Array.isArray(booksData) ? booksData : booksData.books || [];

        let html = `<div class="px-[20px]">
        <hr class="text-gray-300">
        <div class="px-[10px]" id="catBooksHead"></div>
      </div>`;

        const favoriteBooks = books.filter(book => isFavorite(book.id));

    if (favoriteBooks.length > 0) {
  html += `
    <section class="px-[30px] mt-8 flex flex-wrap gap-6 justify-center">
      ${favoriteBooks.map(wishlistCard).join("")}
    </section>
  `;
}

        else {
            html += `
            <div class="flex flex-col items-center justify-center py-20 px-4">
                <div class="text-center">
                    <i class="fa-regular fa-heart text-6xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">Seçilmişlərdə kitab yoxdur</h3>
                    <p class="text-gray-500 mb-6">Bəyəndiyiniz kitabları seçilmişlərə əlavə edin</p>
                    <a href="../index.html" class="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors duration-200">
                        Kitabları kəşf et
                    </a>
                </div>
            </div>`;
        }

        mainSec.innerHTML = html;
        const catBooksHead = document.getElementById("catBooksHead");
        renderHeader(catBooksHead);
        
        updateWishlistCounter();
    }
    catch (err) {
        console.error(err);
        mainSec.innerHTML = `<p class="text-red-500 text-center py-10">Error!</p>`;
    }
}

function renderHeader(catBooksHead) {
    catBooksHead.innerHTML = `
      <h1 class="text-[#0f172a] text-[28px] font-bold mt-4">Seçilmişlər</h1>
      <ul class="flex items-center text-[#555] gap-2 mt-1">
        <li><a class="duration-200 hover:scale-105 hover:font-bold hover:text-[#0f172a]" href="../index.html">Əsas səhifə</a></li><span> / </span>
        <li class="text-[#0f172a]">Seçilmişlər</li>
      </ul>
    `;
}

window.toggleFavorite = function (btn) {
    const id = btn.getAttribute("data-id");
    if (isFavorite(id)) {
        removeFavorite(id);
        btn.classList.remove("active");
        const bookCard = btn.closest('.w-\\[240px\\]');
        if (bookCard) {
            bookCard.style.transition = 'opacity 0.3s ease';
            bookCard.style.opacity = '0';
            setTimeout(() => {
                bookCard.remove();
                const remainingBooks = document.querySelectorAll('.w-\\[240px\\]');
                if (remainingBooks.length === 0) {
                    location.reload(); 
                }
            }, 300);
        }
    } else {
        addFavorite(id);
        btn.classList.add("active");
    }
    updateWishlistCounter();
};

initPage();
