import './BookList.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../../redux/books/actionCreators';
import { toggleFavorite } from '../../redux/books/actionCreators';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';

export default function BookList() {
  const booksSelector = useSelector((state) => state.books);
  // console.log(booksSelector);
  const dispatch = useDispatch();

  function handleClick(id) {
    // console.log(id);
    dispatch(deleteBook(id));
  }

  function handleFavoriteBook(id) {
    dispatch(toggleFavorite(id));
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
                <span onClick={() => handleFavoriteBook(item.id)}>
                  {item.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>

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
