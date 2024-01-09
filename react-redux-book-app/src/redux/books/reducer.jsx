import * as actionTypes from './actionTypes';

const initialState = [];

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return [...state, action.payload];
    case actionTypes.DELETE_BOOK:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}
