import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  selectErrorMessage,
} from '../../redux/error-slice/error-slice';

export default function Error() {
  //   toast.info('test message');
  //   toast.warn('test message');
  const errMess = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  // показываем сообщение и очищаем его после каждый раз когда будет меняться ошибка
  useEffect(() => {
    if (errMess) {
      toast.info(errMess);
      dispatch(clearError());
    }
  }, [errMess, dispatch]);
  return <ToastContainer position="top-right" autoClose={2000} />;
}
