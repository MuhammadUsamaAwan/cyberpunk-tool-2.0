import { combineReducers } from 'redux';
import alert from './slices/alert';
import auth from './slices/auth';

export default combineReducers({
  alert,
  auth,
});
