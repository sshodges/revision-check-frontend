import {
  LOAD_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADING_AUTH,
  CLEAR_ERROR,
  LOGOUT,
} from '../actions/types';
import axios from 'axios';

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: {
    _id: null,
    account: null,
    firstName: '',
    lastName: '',
    company: '',
  },
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_AUTH:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
      console.log(action.payload.data.token);
      localStorage.setItem('token', action.payload.data.token.token);
      axios.defaults.headers.common['auth-token'] =
        action.payload.data.token.token;
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: true,
        error: null,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        state: initialState,
        error: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        state: initialState,
      };
    default:
      return state;
  }
};
