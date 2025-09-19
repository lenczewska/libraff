import getAllCategories from "../service/getAllCategories.js"; 
import createNewBook from "./createNewBook.js"; 
import editBook from "./editBook.js";
import deleteBook from "./deleteBook.js";

let formObj = {};

function getValue(event) {
  const { name, value } = event.target;
  formObj[name] = value;
  console.log("Form object updated:", formObj);
}

function setFormObj(obj) {
  formObj = obj;
  console.log("Form object updated:", formObj);
}

async function openBookModal(mode = "create", book = null) {
  const categData = await getAllCategories();
  const categinKitabi = categData.find(d => d.title === "Kitab");
  const categories = categinKitabi ? categinKitabi.categories : [];

  const container = document.getElementById("dynamicModal");
  container.innerHTML = "";

  const title = mode === "edit" ? "Kitabı redaktə et" : "Yeni kitab əlavə et";
  const btnText = mode === "edit" ? "Dəyiş" : "Yarat";

  container.innerHTML = `
    <div id="BookModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl w-[600px] p-6 shadow-lg relative">
        <button id="closeModal"
            class="absolute top-5 right-5 text-gray-500 hover:text-red-500 cursor-pointer">
            <i class="fa-solid fa-xmark text-xl"></i>
        </button>
        <h2 class="text-[20px] font-bold mb-5">${title}</h2>
        <form id="BookForm" class="flex flex-col items-center gap-5">
          <div class="grid grid-cols-2 gap-4 w-full">
            <input type="text" name="book_name" placeholder="Kitab adı" class="border p-2 rounded col-span-2" required>
            <input type="text" name="book_img" placeholder="Şəkil linki" class="border p-2 rounded col-span-2" required>
            <input type="number" name="price" placeholder="Qiymət" class="border p-2 rounded">
            <input type="text" name="genre" placeholder="Janr" class="border p-2 rounded">
            <input type="text" name="author" placeholder="Müəllif" class="border p-2 rounded col-span-2">
            <select name="category" id="categorySelect" class="border p-2 rounded" required>
              <option value="" disabled selected>Kateqoriya seç</option>
              <option value="Roman">Roman</option>
              <option value="Elmi">Elmi</option>
              <option value="Tarix">Tarix</option>
              <option value="Uşaq kitabları">Uşaq kitabları</option>
              <option value="Poeziya">Poeziya</option>
            </select>
            <select name="altCategory" id="altCategorySelect" class="border p-2 rounded">
              <option value="" disabled selected>Alt kateqoriya seç</option>
            </select>
            <input type="text" name="publisher" placeholder="Nəşriyyat" class="border p-2 rounded">
            <select name="language" class="border p-2 rounded" required>
              <option value="" disabled selected>Dil seç</option>
              <option value="Azərbaycan dili">Azərbaycan dili</option>
              <option value="İngilis dili">İngilis dili</option>
              <option value="Türk dili">Türk dili</option>
              <option value="Rus dili">Rus dili</option>
              <option value="Fars dili">Fars dili</option>
              <option value="Ərəb dili">Ərəb dili</option>
            </select>
            <textarea name="description" placeholder="Təsvir" class="border p-2 rounded col-span-2"></textarea>
            <input type="number" name="pageCount" placeholder="Səhifə sayı" class="border p-2 rounded">
            <input type="number" name="stockCount" placeholder="Stok sayı" class="border p-2 rounded">
          </div>
          <button type="button" id="submitBookBtn" class="rounded-xl px-10 cursor-pointer py-2 bg-gradient-to-r from-[#CC0000] to-[#EF3340] text-white font-bold hover:from-red-700 hover:to-red-600 transition">
            ${btnText}
          </button>
        </form>
      </div>
    </div>
  `;

  document.getElementById("closeModal").addEventListener("click", () => container.innerHTML = "");

  const categorySelect = document.getElementById("categorySelect");
  const altCategorySelect = document.getElementById("altCategorySelect");

  const subcategories = {
    "Roman": ["Klassik", "Müasir", "Fantastik", "Detektiv", "Romantik", "Tarixi"],
    "Elmi": ["Fizika", "Kimya", "Biologiya", "Riyaziyyat", "Tibb", "Texnologiya"],
    "Tarix": ["Qədim tarix", "Orta əsrlər", "Yeni dövr", "Müasir tarix", "Azərbaycan tarixi", "Dünya tarixi"],
    "Uşaq kitabları": ["Nağıllar", "Tərbiyəvi", "Təhsil", "Rəsm kitabları", "Məcərə", "Elm-populyar"],
    "Poeziya": ["Klassik", "Müasir", "Xalq", "Lirik", "Epik", "Satirik"]
  };

  if (categories && categories.length > 0) {
    categories.forEach(cat => {
      const existingOption = Array.from(categorySelect.options).find(option => option.value === cat.title);
      if (!existingOption && cat.title) {
        const option = document.createElement("option");
        option.value = cat.title;
        option.textContent = cat.title;
        categorySelect.appendChild(option);
      }
    });
  }

  categorySelect.addEventListener("change", (e) => {
    const selectedValue = e.target.value;
    
    altCategorySelect.innerHTML = `<option value="" disabled selected>Alt kateqoriya seç</option>`;
    
    if (subcategories[selectedValue]) {
      subcategories[selectedValue].forEach(subcat => {
        const option = document.createElement("option");
        option.value = subcat;
        option.textContent = subcat;
        altCategorySelect.appendChild(option);
      });
    }
    
    const selectedCat = categories.find(c => c.title === selectedValue);
    if (selectedCat && Array.isArray(selectedCat.altCateg)) {
      selectedCat.altCateg.forEach(subcat => {
        const existingOption = Array.from(altCategorySelect.options).find(option => option.value === subcat);
        if (!existingOption && subcat) {
          const option = document.createElement("option");
          option.value = subcat;
          option.textContent = subcat;
          altCategorySelect.appendChild(option);
        }
      });
    }
    
    getValue(e);
  });

  altCategorySelect.addEventListener("change", getValue);

  const formElements = container.querySelectorAll("#BookForm input, #BookForm select, #BookForm textarea");
  formElements.forEach(el => {
    if (el.id !== "categorySelect" && el.id !== "altCategorySelect") {
      el.addEventListener("change", getValue);
    }
  });

  if (mode === "edit" && book) {
    const form = document.getElementById("BookForm");

    if (form.book_name) form.book_name.value = book.book_name || "";
    if (form.book_img) form.book_img.value = book.book_img || "";
    if (form.price) form.price.value = book.price || "";
    if (form.genre) form.genre.value = book.genre || "";
    if (form.author) form.author.value = book.author || "";
    if (form.publisher) form.publisher.value = book.publisher || "";
    if (form.description) form.description.value = book.description || "";
    if (form.pageCount) form.pageCount.value = book.pageCount || "";
    if (form.stockCount) form.stockCount.value = book.stockCount || "";

    const languageSelect = form.language;
    if (languageSelect && book.language) {
      const languageValue = Array.isArray(book.language) ? book.language[0] : book.language;
      languageSelect.value = languageValue;
    }

    if (book.category) {
      categorySelect.value = book.category;
      
      const changeEvent = new Event('change');
      categorySelect.dispatchEvent(changeEvent);
      
      setTimeout(() => {
        if (book.altCategory) {
          altCategorySelect.value = book.altCategory;
        }
      }, 10);
    }

    setFormObj({
      ...book,
      language: Array.isArray(book.language) ? book.language[0] : book.language,
      sale: book.price ? book.price - (book.price * 0.2) : 0
    });
  }

  const submitBtn = document.getElementById("submitBookBtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const requiredFields = container.querySelectorAll("#BookForm [required]");
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = "#ef4444";
        isValid = false;
      } else {
        field.style.borderColor = "#d1d5db";
      }
    });
    
    if (!isValid) {
      alert("Zəhmət olmasa bütün tələb olunan sahələri doldurun!");
      return;
    }
    
    if (mode === "edit") {
      editBook(book.id, formObj);
    } else {
      createNewBook(formObj);
    }
  });
}

document.openBookModal = openBookModal;
document.editBook = editBook;
document.createNewBook = createNewBook;
document.deleteBook = deleteBook;

export default openBookModal;
