import { addFavorite, removeFavorite, isFavorite, updateWishlistCounter } from '../utils/favUtils.js';

function getDetailTemplate(book, discount) {
    const isInWishlist = isFavorite(book.id);
    const wishlistClass = isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500';
    
    return `
        <div class="flex flex-col lg:flex-row gap-8 w-full">
            <!-- Book Image Section -->
            <div class="w-full lg:w-1/2">
                <div class="relative w-full h-[400px] lg:h-[500px] bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg">
                    <img src="${book.book_img}" alt="${book.book_name}" class="w-full h-full object-cover p-8 transition-transform duration-300 hover:scale-105">
                    <button 
                        onclick="toggleWishlistDetails(this, '${book.id}')" 
                        class="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 ${wishlistClass}"
                        data-id="${book.id}"
                        title="${isInWishlist ? 'Seçilmişlərdən çıxar' : 'Seçilmişlərə əlavə et'}"
                    >
                        <i class="fa-heart ${isInWishlist ? 'fa-solid' : 'fa-regular'} text-lg"></i>
                    </button>
                    ${discount > 0 ? `
                        <div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -${discount}%
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- Book Details Section -->
            <div class="w-full lg:w-1/2 flex flex-col justify-between">
                <div>
                    <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">${book.book_name}</h1>
                    <p class="text-lg text-gray-600 mb-4">${book.author}</p>
                    
                    <!-- Price Section -->
                    <div class="flex items-center gap-4 mb-6">
                        <span class="text-2xl font-bold text-red-600">${book.price} azn</span>
                        ${book.sale ? `<span class="text-lg text-gray-400 line-through">${book.sale} azn</span>` : ''}
                    </div>
                    
                    <!-- Book Info Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">Kateqoriya</p>
                            <p class="font-medium text-gray-900">${book.category}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">Janr</p>
                            <p class="font-medium text-gray-900">${book.genre}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">Dil</p>
                            <p class="font-medium text-gray-900">${book.language}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">Səhifə sayı</p>
                            <p class="font-medium text-gray-900">${book.pageCount}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">Nəşriyyat</p>
                            <p class="font-medium text-gray-900">${book.publisher}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">Stok</p>
                            <p class="font-medium text-gray-900">${book.stockCount} ədəd</p>
                        </div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 mt-8">
                    <button class="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-lg">
                        <i class="fa-solid fa-shopping-cart"></i>
                        Səbətə əlavə et
                    </button>
                    <button class="border-2 border-red-500 text-red-500 hover:bg-red-50 px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-lg">
                        <i class="fa-solid fa-credit-card"></i>
                        Birbaşa al
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.toggleWishlistDetails = function(btn, bookId) {
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

export default getDetailTemplate;
