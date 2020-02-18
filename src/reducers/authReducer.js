import {
  LOAD_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADING,
  CLEAR_ERROR
} from '../actions/types';
import axios from 'axios';

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: {
    name: '',
    company: ''
  },
  error: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.headers.auth);
      axios.defaults.headers.common['Auth'] = action.payload.headers.auth;
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: true,
        error: null,
        loading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
