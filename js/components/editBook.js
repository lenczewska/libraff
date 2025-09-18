import { patchBook } from "../service/httpMethods.js"
import getBookById  from "../service/getElementByID.js"
import loadBooks from "../utils/admin.js"
import { getBookData } from "./bookFormData.js"

async function editBook(id) {
    console.log("Edit is called!");
    const obj = await getBookById(id);
    console.log("Obj:", obj);

    if (!obj) {
        Swal.fire({
            title: "Kitab tapılmadı!",
            icon: "info",
            draggable: true
        });
        return;
    }

    if (
        !obj.book_name || !obj.book_img || !obj.price || !obj.genre || !obj.author ||
        !obj.category || !obj.altCategory || !obj.publisher ||
        !obj.description || !obj.pageCount || !obj.stockCount ||
        !obj.language || obj.language.length === 0
    ) {
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
            icon: "info",
            title: "Bütün xanaları doldur!"
        });
        return;
    }

    try {
        await patchBook(id, obj);
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
            title: "Kitab uğurla dəyişdirildi!"
        });
        loadBooks();
    } catch (error) {
        Swal.fire({
            title: "Xəta baş verdi! (console bax)",
            icon: "error",
            draggable: true
        });
        console.log(error.message);
    }
}

export default editBook;