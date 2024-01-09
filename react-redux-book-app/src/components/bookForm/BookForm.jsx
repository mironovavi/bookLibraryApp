import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBook } from '../../redux/books/actionCreators';
import './BookForm.css';
import books from '../data/books.json';

export default function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  function handleSumbit(event) {
    event.preventDefault();
    if (title && author) {
      //dispatch actions
      const book = {
        title: title,
        author: author,
        id: uuidv4(),
        isFavorite: false,
      };
      // console.log(addBook(book));
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
    const randomBookId = {
      ...randomBook,
      id: uuidv4(),
      isFavorite: false,
    };
    dispatch(addBook(randomBookId));
  }

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
      </form>
    </div>
  );
}
