import { combineReducers } from 'redux';
import alertReducer from './slices/alert';

export default combineReducers({
  alert: alertReducer,
});
