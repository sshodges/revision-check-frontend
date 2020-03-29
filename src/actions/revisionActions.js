import { SET_LOADING, ERROR, GET_REVISIONS } from './types';
import axios from 'axios';

export const getRevisions = documentId => async dispatch => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_BASE_API_URL + `revisions/${documentId}`
    );

    const data = res.data;

    dispatch({
      type: GET_REVISIONS,
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
