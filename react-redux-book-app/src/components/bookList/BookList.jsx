import './BookList.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';

export default function BookList() {
  const booksSelector = useSelector((state) => state.books);
  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {booksSelector.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {booksSelector.map((item, idx) => (
            <li key={idx}>
              <div className="book-info">
                {++idx}. {item.title} by <strong>{item.author}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
