import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books-slice/reducer';
import filterReducer from './filter-slice/reducer';

export default configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
  },
});
