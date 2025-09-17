const books = document.getElementById('dayBooks');

const BASE_URL = `https://lenczewska-libraff-az-data.onrender.com/books`;
let data;



function printAllBooks() {
    books.innerHTML = "";

    data.forEach(item => {
 const card = `
<div class="w-[240px] p-[20px] hover:shadow-xl hover:shadow-gray-600 rounded-[20px] transition-all duration-300 group">
  <div class="relative w-[200px] h-[250px] bg-gray-100 rounded-[20px] mb-[20px] overflow-hidden">
    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-center p-[20px]">
    <div class="absolute top-2 right-2 text-gray-300  text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
      <i class="fa-solid fa-heart hover:text-red-600 "></i>
    </div>
  </div>
  <div>
    <p class="mt-2 text-black font-bold w-full">${item.title}</p>
    <div class="flex items-center gap-[10px]">
      <p class="text-red-600 font-bold">${item.price} azn</p>
      ${item.sale ? `<del class="text-gray-400 text-sm">${item.sale} azn</del>` : ""}
    </div>
  </div>
</div>
`;



        books.innerHTML += card;
    });
}
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
      const card = `
<div class="w-[240px] p-[20px] hover:shadow-xl rounded-[20px] transition-all duration-300">
  <div class="group relative w-[200px] h-[250px] bg-gray-100 rounded-[20px] mb-[20px] overflow-hidden flex items-center justify-center">
    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover p-[20px]">
  </div>
  <div>
    <p class="mt-2 text-black font-bold w-full">${item.title}</p>
    <div class="flex items-center gap-[10px]">
      <p class="text-red-600 font-bold">${item.price} azn</p>
      ${item.sale ? `<del class="text-gray-400 text-sm">${item.sale} azn</del>` : ""}
    </div>
  </div>
</div>
`;
      booksContainer.innerHTML += card;
    });
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








