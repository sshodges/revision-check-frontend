import {
  LOAD_USER,
  UPDATE_USER,
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

export const updateUser = (payload) => async (dispatch) => {
  setLoading();
  try {
    const res = await axios.put(
      process.env.REACT_APP_BASE_API_URL + 'users',
      payload
    );

    console.log(res.data);

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    return true;
  } catch (error) {
    console.log('err:', error);
    dispatch({ type: LOGIN_FAIL, payload: '' });
    return false;
  }
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
      payload: error.message,
    });

    return false;
  }
};

export const registerUser = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_BASE_API_URL + 'users',
      payload
    );

    return res;
  } catch (error) {
    console.log(error);

    dispatch({
      type: LOGIN_FAIL,
      payload: error.errorMessage.errors,
    });

    return false;
  }
};

export const verifyUser = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_BASE_API_URL + 'auth/verify-user',
      payload
    );

    // dispatch({
    //   type: LOGIN_SUCCESS,
    //   payload: response,
    // });

    return res;
  } catch (error) {
    return error.response;
  }
};

export const resendVerifyCode = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_BASE_API_URL + 'auth/resend-verify-user',
      payload
    );

    // dispatch({
    //   type: LOGIN_SUCCESS,
    //   payload: response,
    // });

    return res;
  } catch (error) {
    return error.response;
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
