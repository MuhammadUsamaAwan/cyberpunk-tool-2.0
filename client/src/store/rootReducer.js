import { combineReducers } from 'redux';
import alert from './slices/alert';
import auth from './slices/auth';
import builds from './slices/builds';
import profile from './slices/profile';

export default combineReducers({
  alert,
  auth,
  builds,
  profile,
});
