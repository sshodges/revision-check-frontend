import {
  SET_LOADING_REVISIONS,
  ERROR,
  GET_REVISIONS,
  CLEAR_REVISIONS,
} from './types';
import axios from 'axios';

export const getRevisions = (documentId) => async (dispatch) => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_API_URL + `revisions/document/${documentId}`
    );

    const data = res.data;

    dispatch({
      type: GET_REVISIONS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error,
    });
  }
};

export const addRevision = (revision) => async (dispatch) => {
  try {
    console.log(revision);
    const res = await axios.post(
      process.env.REACT_APP_BASE_API_URL + `revisions`,
      revision
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateRevision = (revision, revisionId) => async (dispatch) => {
  try {
    const res = await axios.put(
      process.env.REACT_APP_BASE_API_URL + `revisions/${revisionId}`,
      revision
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const clearRevisions = () => (dispatch) => {
  dispatch({
    type: CLEAR_REVISIONS,
  });
};

export const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_REVISIONS,
  });
};
