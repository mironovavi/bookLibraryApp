import axios from 'axios';
// import { addBook } from '../books/actionCreators';
import createBookWithId from '../../utilis/createBookWithId';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];
// const initialState = {
//   books: [],
//   errMesg: '',
// };

//путем добавления extraReducer в slice  мы интегрируем запрос - настраеваяется реагирование на fullfiled, успещный отыет от сервера

export const fetchBook = createAsyncThunk('book/fetchBook', async () => {
  const response = await axios.get('http://localhost:5000/random-book');
  return response.data;
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action?.payload?.title && action?.payload?.author) {
        state.push(createBookWithId(action.payload, 'API'));
      }
    });
    // builder.addCase(fetchBook.rejected, (state, action) => {
    //   state.errMesg = action.error.message;
    // });
  },
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
