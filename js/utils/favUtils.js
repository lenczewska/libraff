const FAVORITES_KEY = "favoriteBooks";

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

 function isFavorite(id) {
  return getFavorites().includes(String(id));
}

 function addFavorite(id) {
  const favs = getFavorites();
  const strId = String(id);
  if (!favs.includes(strId)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favs, strId]));
  }
}

 function removeFavorite(id) {
  const favs = getFavorites().filter(favId => favId !== String(id));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

function updateWishlistCounter() {
  const counter = document.getElementById('wishlistCounter');
  if (counter) {
    const count = getFavorites().length;
    if (count > 0) {
      counter.textContent = count;
      counter.classList.remove('hidden');
    } else {
      counter.classList.add('hidden');
    }
  }
}

document.addEventListener('DOMContentLoaded', updateWishlistCounter);

export {
  getFavorites,
  isFavorite,
  addFavorite,
  removeFavorite,
  updateWishlistCounter
}