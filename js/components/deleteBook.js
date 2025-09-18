import {deleteBook} from "../service/httpMethods.js"; // функция удаления из сервиса
import loadBooks from "../utils/admin.js";

async function deleteBookFunction(id) {
  const result = await Swal.fire({
    title: "Silmək istədiyinə əminsən?",
    icon: "question",
    iconHtml: "?",
    confirmButtonText: "Sil",
    cancelButtonText: "Ləğv et",
    showCancelButton: true,
    showCloseButton: true
  });

  if (!result.isConfirmed) return;

  try {
    await deleteBook(id); // <-- вызываем сервис
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Kitab silindi!"
    });
    loadBooks();
  } catch (error) {
    Swal.fire({
      title: "Xəta baş verdi! ",
      icon: "error",
      draggable: true
    });
    console.log(error.message);
  }
}

// Делаем глобально доступной для HTML
window.deleteBookFunction = deleteBookFunction; // ✅ делаем глобальной

export default deleteBookFunction;
