import getBookById from "../js/service/getElementByID.js";
import getDetailTemplate from "./components/detailsPageTemplate.js"
import { addFavorite, removeFavorite, isFavorite, updateWishlistCounter } from "./utils/favUtils.js";
import categPopUp from "./components/categPopUp.js";
import getAllBooks from "../js/service/getAllBooks.js";
import card from "./components/card.js";

window.categPopUp = categPopUp;

const query = location.search;
const id = new URLSearchParams(query).get("id");
const mainSec = document.getElementById("mainSec");

const styles = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * {
        font-family: 'Inter', sans-serif;
    }

    body {
        min-height: 100vh;
    }

    .glass-card {
        backdrop-filter: blur(20px);
        border: 1px solid rgba(148, 163, 184, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .glass-card-light {
        backdrop-filter: blur(20px);
        border: 1px solid rgba(148, 163, 184, 0.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .modern-loader {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(148, 163, 184, 0.3);
        border-top: 3px solid #ef4444;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .modern-tab {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        color: #94a3b8;
    }

    .modern-tab::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        transition: width 0.3s ease;
    }

    .modern-tab.active::before {
        width: 100%;
    }

    .modern-tab.active {
        color: #f1f5f9;
        font-weight: 600;
    }

    .modern-tab:hover {
        color: #ef4444;
    }

    .spec-row {
        transition: all 0.2s ease;
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 8px;
    }

    .spec-row:hover {
        transform: translateX(4px);
    }

    .floating-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .floating-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    }

    .gradient-text {
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .gray-gradient-text {
        background: linear-gradient(135deg, #64748b, #475569);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .modern-button {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .modern-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
    }

    .modern-button:hover::before {
        left: 100%;
    }

    .red-accent-bg {
        background: linear-gradient(135deg, #ef4444, #dc2626);
    }

    .gray-accent-bg {
        background: linear-gradient(135deg, #64748b, #475569);
    }

    .dark-card {
        border: 1px solid rgba(148, 163, 184, 0.2);
    }

    .book-image-container {
        width: 320px;
        height: 420px;
        min-width: 320px;
    }

    .book-details-container {
        max-width: 500px;
    }

    .related-book-card {
        width: 180px;
        min-width: 180px;
    }

    .related-book-image {
        width: 100%;
        height: 240px;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        .book-image-container {
            width: 280px;
            height: 380px;
            min-width: 280px;
        }
        
        .related-book-card {
            width: 160px;
            min-width: 160px;
        }
        
        .related-book-image {
            height: 200px;
        }
    }
</style>
`;

// Добавляем стили в head
if (!document.head.querySelector('#modern-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'modern-styles';
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
}

async function renderBook() {
    try {
        if (!id) {
            throw new Error('No book ID provided');
        }

        mainSec.innerHTML = `
            <div class="flex justify-center items-center py-20 w-full">
                <div class="modern-loader"></div>
            </div>
        `;

        const delay = new Promise(resolve => setTimeout(resolve, 500));
        const [book] = await Promise.all([getBookById(id), delay]);
        
        if (!book || !book.id) {
            throw new Error('Book not found');
        }

        mainSec.innerHTML = `
            <div class="flex justify-center w-full">
                <div class="w-full max-w-7xl px-6">
                    <div class="glass-card rounded-2xl p-6 mb-8 fade-in">
                        <div id="catBooksHead"></div>
                    </div>
                </div>
            </div>
            <section id="detSection" class="flex justify-center w-full mb-12 fade-in">
                <div class="w-full max-w-7xl px-6"></div>
            </section>
            <section id="aboutBook" class="flex justify-center w-full mb-12 fade-in">
                <div class="w-full max-w-7xl px-6"></div>
            </section>
            <section id="relatedBooks" class="flex justify-center w-full mb-12 fade-in">
                <div class="w-full max-w-7xl px-6"></div>
            </section>
        `;

        const catBooksHead = document.querySelector("#catBooksHead");
        const detSection = document.querySelector("#detSection > div");
        const aboutBook = document.querySelector("#aboutBook > div");
        const relatedBooks = document.querySelector("#relatedBooks > div");

        if (!book.code) {
            const newCode = generateUniqueCode();
            const updatedBook = await updateBookCode(id, newCode);
            book.code = updatedBook?.code || newCode;
        }

        catBooksHead.innerHTML = `
            <div class="flex justify-center w-full">
                <nav class="flex items-center text-slate-300 gap-3 text-sm">
                    ${navYolu("Kitab", book.category, book.altCategory, book.book_name)}
                </nav>
            </div>
        `;

        const discount = calculateDiscount(book.price, book.sale);
        detSection.innerHTML = getModernDetailTemplate(book, discount);
        
        updateWishlistCounter();

        aboutBook.innerHTML = `
            <div x-data="{ selectedTab: 'desc' }" class="w-full">
                <div class="glass-card rounded-2xl p-8">
                    <div class="flex justify-center gap-12 mb-8" role="tablist">
                        <button @click="selectedTab = 'desc'" 
                                :class="selectedTab === 'desc' ? 'modern-tab active' : 'modern-tab'"
                                class="px-6 py-4 text-lg font-medium transition-all duration-300" 
                                role="tab">
                            Təsvir
                        </button>
                        <button @click="selectedTab = 'specs'" 
                                :class="selectedTab === 'specs' ? 'modern-tab active' : 'modern-tab'"
                                class="px-6 py-4 text-lg font-medium transition-all duration-300" 
                                role="tab">
                            Xüsusiyyətlər
                        </button>
                    </div>
                    
                    <div class="max-w-4xl mx-auto">
                        <div x-show="selectedTab === 'desc'" x-cloak class="fade-in">
                            <div class="glass-card-light p-8 rounded-xl">
                                <h3 class="text-2xl font-bold gradient-text mb-6">Kitab haqqında</h3>
                                <div class="prose prose-lg max-w-none">
                                    <p class="text-slate-700 leading-relaxed text-lg">${book.description || 'Bu kitab haqqında təfərrüatlı məlumat mövcud deyil.'}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div x-show="selectedTab === 'specs'" x-cloak class="fade-in">
                            <div class="glass-card-light p-8 rounded-xl">
                                <h3 class="text-2xl font-bold gradient-text mb-8">Texniki xüsusiyyətlər</h3>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div class="space-y-2">
                                        <div class="spec-row rounded-lg">
                                            <div class="flex justify-between items-center">
                                                <span class="text-slate-500 font-medium">Müəllif</span>
                                                <span class="text-slate-900 font-semibold">${book.author}</span>
                                            </div>
                                        </div>
                                        <div class="spec-row rounded-lg">
                                            <div class="flex justify-between items-center">
                                                <span class="text-slate-500 font-medium">Janr</span>
                                                <span class="text-slate-900 font-semibold">${book.genre}</span>
                                            </div>
                                        </div>
                                        <div class="spec-row rounded-lg">
                                            <div class="flex justify-between items-center">
                                                <span class="text-slate-500 font-medium">Kateqoriya</span>
                                                <span class="text-slate-900 font-semibold">${book.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="space-y-2">
                                        <div class="spec-row rounded-lg">
                                            <div class="flex justify-between items-center">
                                                <span class="text-slate-500 font-medium">Nəşriyyat</span>
                                                <span class="text-slate-900 font-semibold">${book.publisher}</span>
                                            </div>
                                        </div>
                                        <div class="spec-row rounded-lg">
                                            <div class="flex justify-between items-center">
                                                <span class="text-slate-500 font-medium">Səhifə sayı</span>
                                                <span class="text-slate-900 font-semibold">${book.pageCount}</span>
                                            </div>
                                        </div>
                                        <div class="spec-row rounded-lg">
                                            <div class="flex justify-between items-center">
                                                <span class="text-slate-500 font-medium">Dil</span>
                                                <span class="text-slate-900 font-semibold">${book.language}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        await loadRelatedBooks(book, relatedBooks);
    }
    catch (err) {
        console.error('Error loading book details:', err);
        mainSec.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 px-4">
                <div class="glass-card rounded-2xl p-12 text-center max-w-md">
                    <div class="w-20 h-20 mx-auto mb-6 red-accent-bg rounded-full flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-2xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-200 mb-3">Kitab tapılmadı</h3>
                    <p class="text-slate-400 mb-8">Axtardığınız kitab mövcud deyil və ya silinib</p>
                    <a href="../index.html" class="modern-button inline-block gray-accent-bg hover:opacity-90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                        Əsas səhifəyə qayıt
                    </a>
                </div>
            </div>
        `;
    }
}

function getModernDetailTemplate(book, discount) {
    const isFav = isFavorite(book.id);
    
    return `
        <div class="flex justify-center w-full">
            <div class="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-6xl">
                <!-- Book Image -->
                <div class="flex justify-center">
                    <div class="floating-card glass-card p-6 rounded-2xl">
                        <div class="relative book-image-container">
                            <img src="${book.book_img}" alt="${book.book_name}" 
                                 class="w-full h-full object-cover rounded-xl shadow-2xl">
                            ${discount > 0 ? `<div class="absolute -top-2 -right-2 red-accent-bg text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">-${discount}%</div>` : ''}
                        </div>
                    </div>
                </div>
                
                <!-- Book Details -->
                <div class="book-details-container space-y-6">
                    <div class="glass-card p-8 rounded-2xl">
                        <h1 class="text-2xl lg:text-3xl font-bold text-slate-100 mb-4 text-center lg:text-left">${book.book_name}</h1>
                        <p class="text-lg text-slate-300 mb-2 text-center lg:text-left">Müəllif: <span class="font-semibold gradient-text">${book.author}</span></p>
                        <p class="text-base text-slate-400 mb-6 text-center lg:text-left">${book.genre} • ${book.category}</p>
                        
                        <div class="flex items-center justify-center lg:justify-start gap-4 mb-8">
                            ${book.sale && book.sale < book.price ? `
                                <div class="flex items-center gap-3">
                                    <span class="text-3xl font-bold gradient-text">${book.sale} ₼</span>
                                    <span class="text-xl text-slate-400 line-through">${book.price} ₼</span>
                                </div>
                            ` : `
                                <span class="text-3xl font-bold gradient-text">${book.price} ₼</span>
                            `}
                        </div>
                        
                        <div class="flex flex-col sm:flex-row gap-4">
                            <button class="modern-button flex-1 gray-accent-bg hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <i class="fas fa-shopping-cart mr-2"></i>
                                Səbətə əlavə et
                            </button>
                            <button onclick="toggleFavorite(this)" data-id="${book.id}" 
                                    class="modern-button px-6 py-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${isFav ? 'red-accent-bg border-red-500 text-white' : 'border-slate-500 text-slate-300 hover:border-red-500 hover:text-red-500'}">
                                <i class="fas fa-heart text-xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="dark-card p-6 rounded-2xl">
                        <h3 class="text-lg font-semibold text-slate-200 mb-4 text-center lg:text-left">Qısa məlumat</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center py-2 border-b border-slate-600/30">
                                <span class="text-slate-400">Nəşriyyat:</span>
                                <span class="font-medium text-slate-200">${book.publisher}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-slate-600/30">
                                <span class="text-slate-400">Səhifələr:</span>
                                <span class="font-medium text-slate-200">${book.pageCount}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-slate-600/30">
                                <span class="text-slate-400">Dil:</span>
                                <span class="font-medium text-slate-200">${book.language}</span>
                            </div>
                            <div class="flex justify-between items-center py-2">
                                <span class="text-slate-400">Kod:</span>
                                <span class="font-medium text-slate-200">${book.code}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateUniqueCode() {
    return String(Math.floor(Math.random() * 1e13)).padStart(13, "0");
}

async function updateBookCode(id, code) {
    try {
        const res = await getBookById(id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: { code }
        });
        return res;
    } catch (err) {
        console.error("Kod xətası:", err);
        return null;
    }
}

function calculateDiscount(price, sale) {
    if (!price || price <= 0) return 0;
    if (!sale || sale <= 0) return 0;
    return Math.round(((price - sale) / price) * 100);
}

function navYolu(main, category, altCategory, bookName) {
    return `
        <a class="flex items-center text-slate-400 hover:text-red-400 transition-all duration-200 hover:transform hover:translate-x-1" href="../index.html">
            <i class="fas fa-home mr-2"></i>
            ${main}
        </a>
        <i class="fas fa-chevron-right text-slate-500 mx-2"></i>
        <a class="text-slate-400 hover:text-red-400 transition-all duration-200 hover:transform hover:translate-x-1" href="#">${category}</a>
        ${altCategory ? `
            <i class="fas fa-chevron-right text-slate-500 mx-2"></i>
            <a class="text-slate-400 hover:text-red-400 transition-all duration-200 hover:transform hover:translate-x-1" href="#">${altCategory}</a>
        ` : ''}
        <i class="fas fa-chevron-right text-slate-500 mx-2"></i>
        <span class="text-slate-200 font-medium">${bookName}</span>
    `;
}

async function loadRelatedBooks(currentBook, container) {
    try {
        const allBooks = await getAllBooks();
        const booksArray = Array.isArray(allBooks) ? allBooks : allBooks.books;
        
        const relatedBooks = booksArray
            .filter(book => 
                book.id !== currentBook.id && 
                (book.category === currentBook.category || 
                 book.genre === currentBook.genre || 
                 book.author === currentBook.author)
            )
            .slice(0, 6); 
        
        if (relatedBooks.length > 0) {
            container.innerHTML = `
                <div class="flex justify-center w-full">
                    <div class="glass-card rounded-2xl p-8 w-full max-w-6xl">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold gradient-text mb-4">Oxşar kitablar</h2>
                            <p class="text-slate-300 text-lg">Bu kitabla oxşar kitabları kəşf edin</p>
                        </div>
                        <div class="flex justify-center">
                            <div class="flex gap-6 overflow-x-auto pb-4 max-w-full" style="scroll-snap-type: x mandatory;">
                                ${relatedBooks.map(book => getModernCard(book)).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="glass-card rounded-2xl p-8">
                    <div class="text-center">
                        <h2 class="text-3xl font-bold gradient-text mb-4">Oxşar kitablar</h2>
                        <p class="text-slate-300 text-lg">Hal-hazırda oxşar kitablar mövcud deyil</p>
                    </div>
                </div>
            `;
        }
        
        updateWishlistCounter();
    } catch (error) {
        console.error('Error loading related books:', error);
        container.innerHTML = `
            <div class="glass-card rounded-2xl p-8">
                <div class="text-center">
                    <h2 class="text-3xl font-bold gradient-text mb-4">Oxşar kitablar</h2>
                    <p class="text-slate-300 text-lg">Oxşar kitabları yükləyərkən xəta baş verdi</p>
                </div>
            </div>
        `;
    }
}

function getModernCard(book) {
    const discount = calculateDiscount(book.price, book.sale);
    const isFav = isFavorite(book.id);
    
    return `
        <div class="related-book-card floating-card glass-card p-4 group cursor-pointer flex-shrink-0" style="scroll-snap-align: start;">
            <div class="relative mb-3">
                <img src="${book.book_img}" alt="${book.book_name}" 
                     class="related-book-image rounded-lg">
                ${discount > 0 ? `<div class="absolute -top-1 -right-1 red-accent-bg text-white px-2 py-1 rounded-full text-xs font-bold">-${discount}%</div>` : ''}
                <button onclick="toggleFavorite(this)" data-id="${book.id}" 
                        class="absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isFav ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-red-500 hover:text-white'}">
                    <i class="fas fa-heart text-xs"></i>
                </button>
            </div>
            <h4 class="font-semibold text-slate-200 text-sm mb-1 line-clamp-2">${book.book_name}</h4>
            <p class="text-slate-400 text-xs mb-2">${book.author}</p>
            <div class="flex items-center justify-between">
                ${book.sale && book.sale < book.price ? `
                    <div class="flex flex-col">
                        <span class="text-sm font-bold gradient-text">${book.sale} ₼</span>
                        <span class="text-xs text-slate-500 line-through">${book.price} ₼</span>
                    </div>
                ` : `
                    <span class="text-sm font-bold gradient-text">${book.price} ₼</span>
                `}
                <button class="modern-button gray-accent-bg text-white px-3 py-1 rounded-lg text-xs font-medium hover:scale-105 transition-transform duration-200">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `;
}

window.toggleFavorite = function (btn) {
    const id = btn.getAttribute("data-id");
    if (isFavorite(id)) {
        removeFavorite(id);
        btn.classList.remove("active");
        btn.classList.remove("bg-red-500", "text-white");
        btn.classList.add("bg-white/80", "text-slate-600");
    } else {
        addFavorite(id);
        btn.classList.add("active");
        btn.classList.remove("bg-white/80", "text-slate-600");
        btn.classList.add("bg-red-500", "text-white");
    }
    updateWishlistCounter();
};

renderBook();