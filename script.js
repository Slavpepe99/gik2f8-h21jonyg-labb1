'use strict';

let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ id, title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

async function apiGetBookById(id, x, y) {
  const url = 'https://gik2f8-labs.herokuapp.com/books/' + id;
  const result = await fetch(url);
  const data = await result.json();
  display(data, x, y);
}

function display(data, x, y) {
 const xFinal = (x + 30) + "px";
 const yFinal = y + "px";

  let tab =
    `<div class="box" 
      style=
      "left: ${xFinal}; 
      top: ${yFinal}; 
      position: absolute;
      width: 700px;
      height: 700px;
      ">

        <img src="${data.coverImage}" alt="Movie_picture" width="200" height="200">
        <ul style="font-size: 20px; font-style: bold;">
          <li>Author: ${data.author}</li>
          <li>Title: ${data.title}</li>
          <li>releaseDate: ${data.releaseDate}</li>
        </ul>
     <div/>`;

  const root = document.getElementById('root');
  root.insertAdjacentHTML("beforeend", tab);
}

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');

  const root = document.getElementById('root');

  if (bookList.length == 10) {
    let existingElement = document.querySelector('.box');
    existingElement && existingElement.remove();
  }

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));

  const a = document.querySelectorAll('.book-list__item');

  for (var i = 0; i < a.length; i++) {
    a[i].addEventListener('mouseenter', addBook)
  }
}

function addBook(event) {
  const id = event.target.id;
  var x = event.clientX;
  var y = event.clientY;
 
  apiGetBookById(id, x, y);

  event.target.addEventListener("mouseleave", (e) => deleteBook(e))
}

function deleteBook(e) {
  let existingElement = document.querySelector('.box');
  existingElement && existingElement.remove();
}














