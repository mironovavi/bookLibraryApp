import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books-slice/reducer';
import filterReducer from './filter-slice/reducer';
import errorReducer from './error-slice/error-slice';

export default configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
  },
});
