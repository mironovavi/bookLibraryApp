import './Filter.css';
import {
  setTitleFilter,
  resetFilters,
  selectTitleFilter,
  setAuthorName,
  selectAuthorFilter,
  setFavoriteFilter,
  selectFavoriteFilter,
} from '../../redux/filter-slice/reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function Filter() {
  const dispatch = useDispatch();
  const filterTitle = useSelector(selectTitleFilter);
  const filterAuthor = useSelector(selectAuthorFilter);
  const filterFavoriteBook = useSelector(selectFavoriteFilter);

  function handleTitleChange(event) {
    dispatch(setTitleFilter(event.target.value));
  }

  function handleAuthorChange(event) {
    dispatch(setAuthorName(event.target.value));
  }

  function handleFavoriteBooksChange() {
    dispatch(setFavoriteFilter());
  }

  function handleResetFilters() {
    dispatch(resetFilters());
  }

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={filterTitle}
            placeholder="Filter by title.."
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <input
            type="text"
            value={filterAuthor}
            placeholder="Filter by author.."
            onChange={handleAuthorChange}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={filterFavoriteBook}
              onChange={handleFavoriteBooksChange}
            />
            Only Favorite
          </label>
        </div>

        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
}
