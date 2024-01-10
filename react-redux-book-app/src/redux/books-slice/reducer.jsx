import axios from 'axios';
// import { addBook } from '../books/actionCreators';
import createBookWithId from '../../utilis/createBookWithId';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from '../error-slice/error-slice';

const initialState = [];
// const initialState = {
//   books: [],
//   errMesg: '',
// };

//путем добавления extraReducer в slice  мы интегрируем запрос - настраеваяется реагирование на fullfiled, успещный отыет от сервера

export const fetchBook = createAsyncThunk(
  'book/fetchBook',
  async (url, thunkAPI) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      // console.log(err);
      thunkAPI.dispatch(setError(err.message));
      throw err;
    }
  }
);

const bookSlice = createSlice({
  name: 'book',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload];
    },
    deleteBook: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    toggleFavoriteBook: (state, action) => {
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      );
    },
  },
  // OPTION1
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action?.payload?.title && action?.payload?.author) {
        state.push(createBookWithId(action.payload, 'API'));
      }
    });
  },
  // OPTION2 - non actual
  // extraReducers: {
  //   [fetchBook.fulfilled]: (state, action) => {
  //     if (action?.payload?.title && action?.payload?.author) {
  //       state.push(createBookWithId(action.payload, 'API'));
  //     }
  //   },
  // },
});

export const { addBook, deleteBook, toggleFavoriteBook } = bookSlice.actions;
export default bookSlice.reducer;

//Убираем так как всю логику передали в extraReducers
// // thunk function -функция которая отправляет такие щапросы в redux
// //отправка запроса с помощью redux
// export async function thunkFunk(dispatch, getState) {
//   //   console.log(getState());
//   try {
//     const response = await axios.get('http://localhost:4000/random-book');
//     // console.log(response);
//     if (response?.data?.title && response?.data?.author) {
//       dispatch(addBook(createBookWithId(response.data, 'API')));
//     }
//   } catch (err) {
//     console.log('Error fetching random book', err);
//   }
//   //   console.log(getState());
// }
