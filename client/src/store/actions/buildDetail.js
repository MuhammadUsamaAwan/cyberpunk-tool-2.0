import {
  GET_BUILD_DETAIL,
  UPDATE_UPVOTES,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../slices/buildDetail';
import { setAlert } from './alert';
import axios from 'axios';

export const getBuildDetail = buildID => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3000/api/builds/${buildID}`);
    dispatch(GET_BUILD_DETAIL(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const upvote = buildID => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/builds/upvote/${buildID}`
    );
    dispatch(UPDATE_UPVOTES(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const devote = buildID => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/builds/devote/${buildID}`
    );
    dispatch(UPDATE_UPVOTES(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const addComment = (buildID, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ text });
  try {
    const res = await axios.post(
      `http://localhost:3000/api/builds/comment/${buildID}`,
      body,
      config
    );
    dispatch(ADD_COMMENT(res.data));
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const removeComment = (buildID, commentID) => async dispatch => {
  try {
    await axios.delete(
      `http://localhost:3000/api/builds/comment/${buildID}/${commentID}`
    );
    dispatch(REMOVE_COMMENT(commentID));
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
