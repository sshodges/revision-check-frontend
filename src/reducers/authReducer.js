import {
  LOAD_USER,
  UPDATE_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOADING_AUTH,
  CLEAR_ERROR,
  LOGOUT,
} from '../actions/types';
import axios from 'axios';

const initialState = {
  isAuthenticated: null,
  loading: false,
  user: {
    sub: '',
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    account: {
      _id: null,
    },
    emailVerified: '',
  },
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_AUTH:
      return {
        ...state,
        loading: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case LOAD_USER:
      axios.defaults.headers.common['auth-token'] = localStorage.getItem(
        'idToken'
      );

      return {
        ...state,
        isAuthenticated: true,
        user: {
          sub: action.payload.sub,
          firstName: action.payload.name,
          lastName: action.payload.given_name,
          email: action.payload.email,
          companyName: action.payload['custom:company'],
          account: {
            _id: action.payload.accountId,
          },
          emailVerified: action.payload.email_verified,
        },
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('accessToken', action.payload.accessToken.jwtToken);
      localStorage.setItem('idToken', action.payload.idToken.jwtToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken.token);
      axios.defaults.headers.common['auth-token'] =
        action.payload.idToken.jwtToken;
      return {
        ...state,
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
      return initialState;
    default:
      return state;
  }
};
