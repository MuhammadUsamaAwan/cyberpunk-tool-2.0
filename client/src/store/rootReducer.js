import { combineReducers } from 'redux';
import alert from './slices/alert';
import auth from './slices/auth';
import builds from './slices/builds';
import userBuilds from './slices/userBuilds';
import profiles from './slices/profiles';
import buildDetail from './slices/buildDetail';

export default combineReducers({
  alert,
  auth,
  builds,
  userBuilds,
  profiles,
  buildDetail,
});
