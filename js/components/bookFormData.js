
let bookData = { sellCount: 0 };

 function setBookData(obj) {
    bookData = obj;
}

 function getBookData() {
    return bookData;
}

 function resetBookData() {
    bookData = { sellCount: 0 };
}

document.updateBookData = function(e) {
    let { name, value, type } = e.target;

    if (type === "number") value = Number(value);

    if (name === "genres") {
        value = value.trim() ? value.split(" ") : [];
    }

    bookData = { ...bookData, [name]: value };

    if (name === "price") {
        bookData.salePrice = value - value * 0.2;
    }
};

export{
    setBookData,
    getBookData,
    resetBookData
}
