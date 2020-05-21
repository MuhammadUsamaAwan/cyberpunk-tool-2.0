import { GET_BUILD_DETAIL, UPDATE_UPVOTES } from '../slices/buildDetail';
import { setAlert } from './alert';
import axios from 'axios';

export const getBuildDetail = buildID => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3000/api/builds/${buildID}`);
    dispatch(GET_BUILD_DETAIL(res.data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};

export const upvote = buildID => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/builds/upvote/${buildID}`
    );
    dispatch(UPDATE_UPVOTES(res.data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};

export const devote = buildID => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/builds/devote/${buildID}`
    );
    dispatch(UPDATE_UPVOTES(res.data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};
