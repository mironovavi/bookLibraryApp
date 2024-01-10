// !!!простое приложение node.js

// импорты пакетов
const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');

//создаем приложения express
const app = express();
// применяем cors
app.use(cors());

function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * booksData.length);
  const randomBook = booksData[randomIndex];
  return randomBook;
}

app.get('/random-book', (req, res) => {
  // const randomIndex = Math.floor(Math.random() * booksData.length);
  // const randomBook = booksData[randomIndex];
  res.json(getRandomBook);
});

app.get('/random-book-delayed', (req, res) => {
  setTimeout(() => {
    res.json(getRandomBook());
  }, 2000);
});

//запускаем сервер на определенном порту
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
