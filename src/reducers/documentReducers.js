import {
  GET_ALL_DOCUMENTS,
  GET_ALL_FOLDERS,
  SET_LOADING,
  ERROR
} from '../actions/types';

const initialState = {
  documents: [],
  folders: [],
  loading: false,
  parent: 0,
  error: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_ALL_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
        loading: false
      };
    case GET_ALL_FOLDERS:
      return {
        ...state,
        folders: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
