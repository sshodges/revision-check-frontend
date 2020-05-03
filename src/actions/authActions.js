import {
  LOAD_USER,
  SET_LOADING_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getUser = () => async (dispatch) => {
  setLoading();
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(process.env.REACT_APP_BASE_API_URL + 'auth');

      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
      return true;
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: '' });
      return false;
    }
  }

  dispatch({ type: LOGIN_FAIL, payload: '' });
  return false;
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_API_URL + 'auth',
      {
        email,
        password,
      }
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });

    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });

    return false;
  }
};

export const registerUser = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_API_URL + 'users',
      payload
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });

    return true;
  } catch (error) {
    console.log(error);
    console.log(error.errorMessage);
    console.log(error.errorMessage.errors);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.errorMessage.errors,
    });

    return false;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  return dispatch({
    type: LOGOUT,
  });
};

export const clearError = () => (dispatch) => {
  return dispatch({
    type: CLEAR_ERROR,
  });
};

export const setLoading = () => (dispatch) => {
  return dispatch({
    type: SET_LOADING_AUTH,
  });
};
