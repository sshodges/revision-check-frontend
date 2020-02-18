import {
  GET_ALL_DOCUMENTS,
  GET_ALL_FOLDERS,
  SET_LOADING,
  CHANGE_PARENT,
  ERROR
} from './types';
import axios from 'axios';

export const getAllDocuments = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get(
      process.env.REACT_APP_BASE_API_URL + 'documents/folders'
    );

    let data = res.data;

    data = data.map(obj =>
      obj.status ? { ...obj, type: 'document' } : { ...obj, type: 'folder' }
    );

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

export const changeParent = parent => async dispatch => {
  dispatch({
    type: CHANGE_PARENT,
    payload: parent
  });
};

export const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING
  });
};
