import {
  GET_REVISIONS,
  UPDATE_REVISION,
  SET_LOADING_REVISIONS,
  ERROR,
  CLEAR_REVISIONS,
  ADD_REVISION,
} from '../actions/types';

const initialState = {
  revisions: [],
  loading: false,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_REVISIONS:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_REVISIONS:
      return {
        ...state,
        revisions: action.payload,
        loading: false,
      };
    case ADD_REVISION:
      return {
        ...state,
        revisions: [
          action.payload,
          ...state.revisions.map((revision) => {
            revision.latest = false;
            return revision;
          }),
        ],
      };
    case UPDATE_REVISION:
      return {
        ...state,
        revisions: state.revisions.map((rev) => {
          if (rev._id === action.payload._id) {
            return action.payload;
          }
          return rev;
        }),
      };
    case CLEAR_REVISIONS:
      return {
        ...state,
        revisions: [],
      };
    default:
      return state;
  }
};
