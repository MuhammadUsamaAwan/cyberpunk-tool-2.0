import { combineReducers } from 'redux';
import alert from './slices/alert';
import auth from './slices/auth';
import builds from './slices/builds';

export default combineReducers({
  alert,
  auth,
  builds,
});
