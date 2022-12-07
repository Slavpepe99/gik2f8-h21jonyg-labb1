const BookListItem = (book) => {
  let html = `<li
                class="book-list__item test mb-2 mx-2 last:mb-0 p-3 text-indigo-900 last:border-b-0 border-b border-indigo-700 cursor-pointer" id=${book.id}>
              ${book.author} - ${book.title} - ${book.id}  
              </li>`;
  return html;
};
