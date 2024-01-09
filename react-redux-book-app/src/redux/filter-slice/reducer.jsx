import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return { ...state, title: action.payload };
    },
    resetFilters: (state) => {
      return initialState;
    },
    setAuthorName: (state, action) => {
      return { ...state, author: action.payload };
    },
    setFavoriteFilter: (state) => {
      return { ...state, onlyFavorite: !state.onlyFavorite };
    },
  },
});

export const {
  setTitleFilter,
  resetFilters,
  setAuthorName,
  setFavoriteFilter,
} = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectFavoriteFilter = (state) => state.filter.onlyFavorite;

export default filterSlice.reducer;
