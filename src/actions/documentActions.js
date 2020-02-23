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

    // TODO: This data manipulation has to happen until backend response is sorted
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

export const addFolder = folder => async dispatch => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_BASE_API_URL + 'folders',
      folder
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateFolder = folder => async dispatch => {
  try {
    const res = await axios.put(
      process.env.REACT_APP_BASE_API_URL + 'folders',
      folder
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteFolder = folderId => async dispatch => {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_BASE_API_URL + `folders/${folderId}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addDocument = document => async dispatch => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_BASE_API_URL + 'documents',
      document
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateDocument = document => async dispatch => {
  try {
    const res = await axios.put(
      process.env.REACT_APP_BASE_API_URL + 'documents',
      document
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteDocument = documentId => async dispatch => {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_BASE_API_URL + `documents/${documentId}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return false;
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
