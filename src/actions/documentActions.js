import {
  GET_ALL_DOCUMENTS,
  GET_ALL_FOLDERS,
  GET_ARCHIVES,
  SET_LOADING_DOCUMENTS,
  CHANGE_PARENT,
  ERROR,
  SELECT_DOCUMENT,
  CLEAR_DOCUMENT,
} from './types';
import axios from 'axios';
import store from 'store';
import { logout } from './authActions';

export const getAllDocuments = () => async (dispatch) => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_API_URL + 'documents/getall/items'
    );

    let data = res.data;

    // TODO: This data manipulation has to happen until backend response is sorted
    data = data.map((obj) =>
      obj.status ? { ...obj, type: 'document' } : { ...obj, type: 'folder' }
    );

    dispatch({
      type: GET_ALL_DOCUMENTS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
    if (error.response?.status === 401) {
      store.dispatch(logout());
      return;
    }

    dispatch({
      type: ERROR,
      payload: error,
    });
  }
};

export const getArchives = () => async (dispatch) => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_API_URL + 'documents/archive/all'
    );

    let data = res.data;

    dispatch({
      type: GET_ARCHIVES,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
    if (error.response?.status === 401) {
      store.dispatch(logout());
      return;
    }
    dispatch({
      type: ERROR,
      payload: error,
    });
  }
};

export const getDocumentByRevcode = (payload) => async (dispatch) => {
  const res = await axios
    .post(process.env.REACT_APP_BASE_API_URL + 'documents/by-rev-code', payload)
    .catch((err) => {
      return err.response;
    });

  let data = res.data;

  return data;
};

export const followDocument = (payload) => async (dispatch) => {
  const res = await axios
    .post(
      process.env.REACT_APP_BASE_API_URL + 'documents/follow-document',
      payload
    )
    .catch((err) => {
      return err.response;
    });

  let data = res.data;

  return data;
};

export const approveFollower = (payload) => async (dispatch) => {
  const res = await axios
    .post(
      process.env.REACT_APP_BASE_API_URL + 'documents/follower/approve',
      payload
    )
    .catch((err) => {
      return err.response;
    });

  let data = res.data;

  return data;
};

export const denyFollower = (payload) => async (dispatch) => {
  console.log(payload);
  const res = await axios
    .post(
      process.env.REACT_APP_BASE_API_URL + 'documents/follower/deny',
      payload
    )
    .catch((err) => {
      return err.response;
    });

  let data = res.data;

  return data;
};

export const getDocumentFollowers = (documentId) => async (dispatch) => {
  const res = await axios
    .get(
      process.env.REACT_APP_BASE_API_URL +
        'documents/get-followers/' +
        documentId
    )
    .catch((err) => {
      return err.response;
    });

  let data = res.data;

  return data;
};

export const getAllFolders = () => async (dispatch) => {
  try {
    const res = await axios.get(process.env.REACT_APP_BASE_API_URL + 'folders');

    const data = res.data;

    dispatch({
      type: GET_ALL_FOLDERS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error,
    });
  }
};

export const addFolder = (folder) => async (dispatch) => {
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

export const updateFolder = (id, folder) => async (dispatch) => {
  try {
    const res = await axios.put(
      process.env.REACT_APP_BASE_API_URL + `folders/${id}`,
      folder
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteFolder = (folderId) => async (dispatch) => {
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

export const addDocument = (document) => async (dispatch) => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_BASE_API_URL + 'documents',
      document
    );

    return res.data;
  } catch (error) {
    if (error.response.status) {
      return 'duplicate';
    }
    return false;
  }
};

export const updateDocument = (id, document) => async (dispatch) => {
  try {
    const res = await axios.put(
      process.env.REACT_APP_BASE_API_URL + `documents/${id}`,
      document
    );

    return res.data;
  } catch (error) {
    if (error.response.status) {
      return 'duplicate';
    }
    return false;
  }
};

export const deleteDocument = (documentId) => async (dispatch) => {
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

export const changeParent = (parent) => async (dispatch) => {
  dispatch({
    type: CHANGE_PARENT,
    payload: parent,
  });
};

export const selectDocument = (document) => async (dispatch) => {
  dispatch({
    type: SELECT_DOCUMENT,
    payload: document,
  });
};

export const setDocumentLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_DOCUMENTS,
  });
};

export const clearDocuments = () => (dispatch) => {
  dispatch({
    type: CLEAR_DOCUMENT,
  });
};
