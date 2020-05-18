import uuid from 'react-uuid';
import { SET_ALERT, REMOVE_ALERT } from '../slices/alert';

export const setAlert = (msg, type, timeout = 5000) => (dispatch) => {
  console.log('ran');
  const id = uuid();
  dispatch(
    SET_ALERT({
      msg,
      type,
      id,
    })
  );

  setTimeout(() => dispatch(REMOVE_ALERT(id)), timeout);
};
