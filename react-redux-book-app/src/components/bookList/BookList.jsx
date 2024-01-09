import './BookList.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../../redux/books/actionCreators';

export default function BookList() {
  const booksSelector = useSelector((state) => state.books);
  // console.log(booksSelector);
  const dispatch = useDispatch();

  function handleClick(id) {
    // console.log(id);
    dispatch(deleteBook(id));
  }

  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {booksSelector.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {booksSelector.map((item, idx) => (
            <li key={item.id}>
              <div className="book-info">
                {++idx}. {item.title} by <strong>{item.author}</strong>
              </div>
              <div className="book-actions">
                <button onClick={() => handleClick(item.id)}>
                  Delete book
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
