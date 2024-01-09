import * as actionTypes from './actionTypes';

const initialState = [];

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return [...state, action.payload];
    case actionTypes.DELETE_BOOK:
      return state.filter((item) => item.id !== action.payload);
    case actionTypes.TOGGLE_FAVORITE:
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      );
    default:
      return state;
  }
}
