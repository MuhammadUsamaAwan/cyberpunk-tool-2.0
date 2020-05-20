import axios from 'axios';
import { GET_BUILDS } from '../slices/builds';
import { GET_USER_BUILDS } from '../slices/userBuilds';
import { setAlert } from './alert';

export const getBuilds = (page, limit, sort, text) => async (dispatch) => {
  try {
    const res = await axios.get(
      `api/builds?page=${page}&limit=${limit}&sort=${sort}&text=${text}`
    );
    dispatch(GET_BUILDS(res.data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};

export const getUserBuilds = (page, limit, sort, user, pri) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/builds?page=${page}&limit=${limit}&sort=${sort}&user=${user}&private=${pri}`
    );
    dispatch(GET_USER_BUILDS(res.data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};
