import { GET_REVISIONS, SET_LOADING, ERROR } from '../actions/types';

const initialState = {
  revisions: [],
  loading: false,
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
    case GET_REVISIONS:
      return {
        ...state,
        revisions: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
