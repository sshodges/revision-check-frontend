import { combineReducers } from 'redux';
import documentReducer from './documentReducer';
import revisionReducer from './revisionReducer';
import authReducer from './authReducer';
import layoutReducer from './layoutReducer';

export default combineReducers({
  document: documentReducer,
  revision: revisionReducer,
  auth: authReducer,
  layout: layoutReducer,
});
