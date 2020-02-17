import {
  LOAD_USER,
  SET_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(process.env.REACT_APP_BASE_API_URL + 'users');

      console.log(res);

      dispatch({
        type: LOAD_USER,
        payload: res.data
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

export const loginUser = (email, password) => async dispatch => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_API_URL + 'users/login',
      {
        email,
        password
      }
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response
    });

    return true;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message
    });

    return false;
  }
};

export const clearError = () => dispatch => {
  return dispatch({
    type: CLEAR_ERROR
  });
};

export const setLoading = () => dispatch => {
  return dispatch({
    type: SET_LOADING
  });
};
