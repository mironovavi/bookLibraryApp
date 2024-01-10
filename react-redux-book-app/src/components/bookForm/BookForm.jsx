import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
import createBookWithId from '../../utilis/createBookWithId';
import { addBook } from '../../redux/books/actionCreators';
import './BookForm.css';
import books from '../data/books.json';
import { thunkFunk } from '../../redux/books-slice/books-slice';

export default function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  function handleSumbit(event) {
    event.preventDefault();
    if (title && author) {
      //dispatch actions
      // const book = {
      //   title: title,
      //   author: author,
      //   id: uuidv4(),
      //   isFavorite: false,
      // };
      // console.log(addBook(book));
      const book = createBookWithId({ title: title, author: author }, 'manual');
      dispatch(addBook(book));

      // console.log(title, author);
      setTitle('');
      setAuthor('');
    }
  }

  function handleRandomBook() {
    // console.log(books);
    const randomIdx = Math.floor(Math.random() * books.length);
    // console.log(randomIdx);
    const randomBook = books[randomIdx];
    // const randomBookId = {
    //   ...randomBook,
    //   id: uuidv4(),
    //   isFavorite: false,
    // };
    const randomBookId = createBookWithId(randomBook, 'random');
    dispatch(addBook(randomBookId));
  }

  //запрос перенесли в books-slice.jsx

  // // thunk function -функция которая отправляет такие щапросы в redux
  // //отправка запроса с помощью redux
  // async function thunkFunk(dispatch, getState) {
  //   console.log(getState());
  //   try {
  //     const response = await axios.get('http://localhost:4000/random-book');
  //     // console.log(response);
  //     if (response?.data?.title && response?.data?.author) {
  //       dispatch(addBook(createBookWithId(response.data, 'API')));
  //     }
  //   } catch (err) {
  //     console.log('Error fetching random book', err);
  //   }
  //   console.log(getState());
  // }

  async function handleRandomBookAPI() {
    dispatch(thunkFunk);
  }

  // //отправка асинхронного запроса с помощью axios
  // async function handleRandomBookAPI() {
  //   try {
  //     const response = await axios.get('http://localhost:4000/random-book');
  //     // console.log(response);
  //     if (response?.data?.title && response?.data?.author) {
  //       dispatch(addBook(createBookWithId(response.data, 'API')));
  //     }
  //   } catch (err) {
  //     console.log('Error fetching random book', err);
  //   }
  // }

  return (
    <div className="app-block book-form">
      <h2>Add new book!</h2>
      <form onSubmit={handleSumbit} className="book-form">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

        <button type="submit">Add book</button>
        <button type="button" onClick={handleRandomBook}>
          Add random book
        </button>
        <button type="button" onClick={handleRandomBookAPI}>
          Add random book via API
        </button>
      </form>
    </div>
  );
}
