const books = document.getElementById('dayBooks');

const BASE_URL = `https://lenczewska-libraff-az-data.onrender.com/books`;
let data;

import { addFavorite, removeFavorite, isFavorite, updateWishlistCounter } from './utils/favUtils.js';




document.addEventListener("DOMContentLoaded", async () => {
  const langLinks = document.querySelectorAll("#chooseLang a");
  const booksContainer = document.getElementById("dayBooks");

  let data = [];

  try {
const res = await fetch("https://lenczewska-libraff-az-data.onrender.com/books");
    const json = await res.json();
    data = Array.isArray(json) ? json : json.books;
    console.log("Data loaded:", data);
  } catch (err) {
    console.error("Ошибка загрузки данных:", err);
    return;
  }

  function renderBooks(filteredData) {
    if (!Array.isArray(filteredData)) {
      console.error("renderBooks: filteredData is not an array", filteredData);
      return;
    }

    booksContainer.innerHTML = "";
    filteredData.forEach(item => {
      const isInWishlist = isFavorite(item.id);
      const wishlistClass = isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500';
      
      const card = `
<div class="w-[240px] p-[20px] hover:shadow-xl rounded-[20px] transition-all duration-300 group bg-white relative">
  <div class="group relative w-[200px] h-[250px] bg-gray-100 rounded-[20px] mb-[20px] overflow-hidden flex items-center justify-center">
    <a href="./pages/details.html?id=${item.id}" class="block w-full h-full">
      <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover p-[20px] hover:scale-105 transition-transform duration-300">
    </a>
    <button 
      onclick="toggleWishlist(this, '${item.id}')" 
      class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 ${wishlistClass}"
      data-id="${item.id}"
      title="${isInWishlist ? 'Seçilmişlərdən çıxar' : 'Seçilmişlərə əlavə et'}"
    >
      <i class="fa-heart ${isInWishlist ? 'fa-solid' : 'fa-regular'} text-sm"></i>
    </button>
  </div>
  <a href="./pages/details.html?id=${item.id}" class="block hover:text-red-600 transition-colors duration-200">
    <p class="mt-2 text-black font-bold w-full">${item.title}</p>
  </a>
  <div class="flex items-center gap-[10px]">
    <p class="text-red-600 font-bold">${item.price} azn</p>
    ${item.sale ? `<del class="text-gray-400 text-sm">${item.sale} azn</del>` : ""}
  </div>
</div>
`;
      booksContainer.innerHTML += card;
    });
    
    updateWishlistCounter();
  }

  function setLanguage(lang) {
    langLinks.forEach(l => l.classList.remove("active"));
    const activeLink = Array.from(langLinks).find(l => l.getAttribute("data-lang") === lang);
    if (activeLink) activeLink.classList.add("active");

    const filtered = data.filter(book => book.language.includes(lang));
    renderBooks(filtered);

    const currentPath = window.location.pathname.split("/").slice(1);
    currentPath[0] = lang;
    const newPath = "/" + currentPath.join("/");
    window.history.pushState({}, "", newPath);
  }

  langLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = link.getAttribute("data-lang");
      setLanguage(lang);
    });
  });

  window.toggleWishlist = function(btn, bookId) {
    const isInWishlist = isFavorite(bookId);
    const heartIcon = btn.querySelector('i');
    
    if (isInWishlist) {
      removeFavorite(bookId);
      btn.classList.remove('text-red-500');
      btn.classList.add('text-gray-400', 'hover:text-red-500');
      heartIcon.classList.remove('fa-solid');
      heartIcon.classList.add('fa-regular');
      btn.title = 'Seçilmişlərə əlavə et';
    } else {
      addFavorite(bookId);
      btn.classList.remove('text-gray-400', 'hover:text-red-500');
      btn.classList.add('text-red-500');
      heartIcon.classList.remove('fa-regular');
      heartIcon.classList.add('fa-solid');
      btn.title = 'Seçilmişlərdən çıxar';
    }
    
    updateWishlistCounter();
  };

});





const openModalBtn = document.getElementById('openModal');
const dropdown = document.getElementById('login-dropdown');

openModalBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

    const rect = openModalBtn.getBoundingClientRect();
    dropdown.style.top = rect.bottom + window.scrollY + 20 + 'px';
    dropdown.style.left = rect.right + window.scrollX - dropdown.offsetWidth + 20 + 'px';
});

window.addEventListener('click', (e) => {
    if (!openModalBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const katalogBtn = document.querySelector(".kataloq");
  const catalogModal = document.getElementById("catalogModal");
  const iconBox = katalogBtn.querySelector(".iconBox");
  const closeIcon = katalogBtn.querySelector(".closeIcon");

  katalogBtn.addEventListener("click", () => {
    catalogModal.classList.toggle("hidden");

    iconBox.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });
});








