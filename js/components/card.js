function card(book) {
  return `
    <div class="w-[240px] p-[20px] hover:shadow-xl rounded-[20px] transition-all duration-300 group bg-white">
      <div class="relative w-[200px] h-[250px] mb-[20px] overflow-hidden rounded-lg bg-gray-100">
        <img src="${book.book_img}" alt="${book.book_name}" class="w-full h-full object-cover p-[20px]">
      </div>
      <p class="mt-2 text-black font-bold w-full">${book.book_name}</p>
      <p class="text-gray-700">${book.author}</p>
      <div class="flex items-center gap-2">
        <p class="text-red-600 font-bold">${book.price} azn</p>
        ${book.sale ? `<del class="text-gray-400 text-sm">${book.sale} azn</del>` : ""}
      </div>
    </div>
  `;
}

export default card;

