import axios from 'axios';
import { addBook } from '../books/actionCreators';
import createBookWithId from '../../utilis/createBookWithId';

// thunk function -функция которая отправляет такие щапросы в redux
//отправка запроса с помощью redux
export async function thunkFunk(dispatch, getState) {
  //   console.log(getState());
  try {
    const response = await axios.get('http://localhost:4000/random-book');
    // console.log(response);
    if (response?.data?.title && response?.data?.author) {
      dispatch(addBook(createBookWithId(response.data, 'API')));
    }
  } catch (err) {
    console.log('Error fetching random book', err);
  }
  //   console.log(getState());
}
