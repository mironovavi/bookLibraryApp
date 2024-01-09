import './BookList.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../../redux/books/actionCreators';
import { toggleFavorite } from '../../redux/books/actionCreators';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectFavoriteFilter,
} from '../../redux/filter-slice/reducer';

export default function BookList() {
  const booksSelector = useSelector((state) => state.books);
  const titleFilterSelector = useSelector(selectTitleFilter);
  const authorFilterSelector = useSelector(selectAuthorFilter);
  const filterFavoriteBook = useSelector(selectFavoriteFilter);
  const dispatch = useDispatch();

  function handleClick(id) {
    dispatch(deleteBook(id));
  }

  function handleFavoriteBook(id) {
    dispatch(toggleFavorite(id));
  }

  const filterBooks = booksSelector.filter((item) => {
    const matchesTitle = item.title
      .toLowerCase()
      .includes(titleFilterSelector.toLowerCase());

    const matchesAuthor = item.author
      .toLowerCase()
      .includes(authorFilterSelector.toLowerCase());

    const matchesFavorite = filterFavoriteBook ? item.isFavorite : true;

    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  function highlightMatch(text, filter) {
    if (!filter) return text;
    const reqex = new RegExp(`(${filter})`, 'gi');
    // console.log(text.split(reqex));
    return text.split(reqex).map((item, idx) => {
      if (item.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={idx} className="highlight">
            {item}
          </span>
        );
      }
      return item;
    });
  }

  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {booksSelector.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filterBooks.map((item, idx) => (
            <li key={item.id}>
              <div className="book-info">
                {++idx}. {highlightMatch(item.title, titleFilterSelector)} by{' '}
                <strong>
                  {highlightMatch(item.author, authorFilterSelector)}
                </strong>
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
