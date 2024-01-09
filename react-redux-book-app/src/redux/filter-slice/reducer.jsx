import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
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
  },
});

export const { setTitleFilter, resetFilters, setAuthorName } =
  filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;

export default filterSlice.reducer;