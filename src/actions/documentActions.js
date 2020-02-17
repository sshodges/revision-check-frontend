import {
  GET_ALL_DOCUMENTS,
  GET_ALL_FOLDERS,
  SET_LOADING,
  ERROR
} from './types';
import axios from 'axios';

export const getAllDocuments = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get(
      process.env.REACT_APP_BASE_API_URL + 'documents'
    );

    const data = res.data;

    dispatch({
      type: GET_ALL_DOCUMENTS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error
    });
  }
};

export const getAllFolders = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get(process.env.REACT_APP_BASE_API_URL + 'folders');

    const data = res.data;

    dispatch({
      type: GET_ALL_FOLDERS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error
    });
  }
};

export const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING
  });
};
