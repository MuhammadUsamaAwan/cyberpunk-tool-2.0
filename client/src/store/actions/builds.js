import axios from 'axios';
import { GET_BUILDS, SORT_BUILDS, SEARCH_BUILDS } from '../slices/builds';
import { setAlert } from './alert';

export const getBuilds = (page, limit) => async (dispatch) => {
  try {
    const res = await axios.get(`api/builds?page=${page}&limit=${limit}`);
    dispatch(GET_BUILDS(res.data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};

export const sortBuilds = (page, limit, sort) => async (dispatch) => {
  try {
    const res = await axios.get(
      `api/builds?page=${page}&limit=${limit}&sort=${sort}`
    );
    dispatch(SORT_BUILDS(res.data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};

export const searchBuilds = (page, limit, sort, text) => async (dispatch) => {
  try {
    const res = await axios.get(
      `api/builds?page=${page}&limit=${limit}&sort=${sort}&text=${text}`
    );
    dispatch(SEARCH_BUILDS(res.data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};
