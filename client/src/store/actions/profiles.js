import axios from 'axios';
import { GET_PROFILE } from '../slices/profiles';
import { setAlert } from './alert';

// Get the use by id
export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/users/user/${id}`);
    dispatch(GET_PROFILE(res.data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};
