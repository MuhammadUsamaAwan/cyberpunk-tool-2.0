import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from '../slices/auth';
import { setAlert } from './alert';
import setAuthToken from '../../ultis/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('api/users/');
    dispatch(USER_LOADED(res.data));
  } catch (err) {
    console.log(err.response);
    // dispatch(AUTH_ERROR());
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('./api/users', body, config);
    dispatch(REGISTER_SUCCESS(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch(REGISTER_FAIL());
  }
};
