import {
  GET_ALL_DOCUMENTS,
  GET_ALL_FOLDERS,
  ADD_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  SET_LOADING,
  CHANGE_PARENT,
  ERROR
} from '../actions/types';
import findPreviousParent from '../utils/findPreviousParent';

const initialState = {
  documents: [],
  folders: [],
  loading: false,
  current: 0,
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
    case ADD_FOLDER:
      return {
        ...state,
        documents: [...state.documents, action.payload]
      };
    case UPDATE_FOLDER:
      return {
        ...state,
        documents: state.documents.map(doc => {
          if (doc.type === 'folder' && doc.id === action.payload.id) {
            return action.payload;
          }
          return doc;
        })
      };
    case DELETE_FOLDER:
      return {
        ...state,
        documents: state.documents.filter(
          doc => doc.type === 'folder' && doc.id === action.payload.id
        )
      };
    case CHANGE_PARENT:
      const previousParent = findPreviousParent(
        action.payload,
        state.documents,
        state.folders
      );
      return {
        ...state,
        current: action.payload,
        parent: previousParent
      };
    default:
      return state;
  }
};
