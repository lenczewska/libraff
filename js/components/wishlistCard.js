import { addFavorite, removeFavorite, isFavorite } from '../utils/favUtils.js';

function wishlistCard(book) {
  const isInWishlist = isFavorite(book.id);
  const wishlistClass = isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500';
  
  return `
    <div class="w-[240px] p-[20px] hover:shadow-xl rounded-[20px] transition-all duration-300 group bg-white relative">
      <div class="relative w-[200px] h-[250px] mb-[20px] overflow-hidden rounded-lg bg-gray-100">
        <a href="./details.html?id=${book.id}" class="block w-full h-full">
          <img src="${book.book_img}" alt="${book.book_name}" class="w-full h-full object-cover p-[20px] hover:scale-105 transition-transform duration-300">
        </a>
        <button 
          onclick="toggleWishlist(this, '${book.id}')" 
          class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 ${wishlistClass}"
          data-id="${book.id}"
          title="${isInWishlist ? 'Seçilmişlərdən çıxar' : 'Seçilmişlərə əlavə et'}"
        >
          <i class="fa-heart ${isInWishlist ? 'fa-solid' : 'fa-regular'} text-sm"></i>
        </button>
      </div>
      <a href="./details.html?id=${book.id}" class="block hover:text-red-600 transition-colors duration-200">
        <p class="mt-2 text-black font-bold w-full">${book.book_name}</p>
        <p class="text-gray-700">${book.author}</p>
      </a>
      <div class="flex items-center gap-2">
        <p class="text-red-600 font-bold">${book.price} azn</p>
        ${book.sale ? `<del class="text-gray-400 text-sm">${book.sale} azn</del>` : ""}
      </div>
    </div>
  `;
}

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

export default wishlistCard;
