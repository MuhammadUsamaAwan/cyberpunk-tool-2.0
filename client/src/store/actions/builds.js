import axios from 'axios';
import { GET_BUILDS, SORT_BUILDS, SEARCH_BUILDS } from '../slices/builds';
import { setAlert } from './alert';

export const getBuilds = () => async (dispatch) => {
  try {
    const res = await axios.get('api/builds');
    const data = res.data.filter((build) => build.private !== true);
    dispatch(GET_BUILDS(data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};

export const sortBuilds = (type) => async (dispatch) => {
  try {
    const res = await axios.get('api/builds');
    let data = res.data.filter((build) => build.private !== true);
    if (type === 'upvotes')
      data = data.sort((a, b) => (a.upvotes > b.upvotes ? -1 : 1));
    if (type === 'newest')
      data = data.sort((a, b) => (a.date > b.date ? -1 : 1));
    if (type === 'oldest')
      data = data.sort((a, b) => (a.date > b.date ? 1 : -1));
    dispatch(SORT_BUILDS(data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};

export const searchBuilds = (text) => async (dispatch) => {
  try {
    const res = await axios.get('api/builds');
    let data = res.data.filter((build) => build.private !== true);
    data = data.filter(
      (build) =>
        build.title.toLowerCase().includes(text.toLowerCase()) ||
        build.name.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(SEARCH_BUILDS(data));
  } catch (err) {
    dispatch(setAlert('Server Error!', 'danger'));
  }
};
