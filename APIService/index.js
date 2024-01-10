// !!!простое приложение node.js

// импорты пакетов
const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');

//создаем приложения express
const app = express();

// применяем cors
app.use(cors());

app.get('/random-book', function (req, res) {
  const randomIdx = Math.floor(Math.random() * booksData.length);
  const randomBook = booksData[randomIdx];
  //возвращаем клиенту одну книгу
  res.json(randomBook);
});

//запускаем сервер на определенном порту
const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
