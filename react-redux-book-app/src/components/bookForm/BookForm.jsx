import { useState } from 'react';
import './BookForm.css';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/books/actionCreators';

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
      };
      // console.log(addBook(book));
      dispatch(addBook(book));

      // console.log(title, author);
      setTitle('');
      setAuthor('');
    }
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
      </form>
    </div>
  );
}
