import getHeader from '../components/header.js';

document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById('headerContainer');
  if (!headerContainer) {
    console.warn('Header container tapılmadı!');
    return;
  }
  headerContainer.innerHTML = getHeader();

  const openModalBtn = document.getElementById('openModal');
  const dropdown = document.getElementById('login-dropdown');

  if (openModalBtn && dropdown) {
    openModalBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

      const rect = openModalBtn.getBoundingClientRect();
      dropdown.style.top = rect.bottom + window.scrollY + 10 + 'px';
      dropdown.style.left = rect.right + window.scrollX - dropdown.offsetWidth + 10 + 'px';
    });

    window.addEventListener('click', (e) => {
      if (!openModalBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }

  const katalogBtn = document.querySelector(".kataloq");
  const catalogModal = document.getElementById("catalogModal");
  const iconBox = katalogBtn?.querySelector(".iconBox");
  const closeIcon = katalogBtn?.querySelector(".closeIcon");

  if (katalogBtn && catalogModal && iconBox && closeIcon) {
    katalogBtn.addEventListener("click", () => {
      catalogModal.classList.toggle("hidden");
      iconBox.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    });
  }

});
