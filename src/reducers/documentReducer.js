import {
  GET_ALL_DOCUMENTS,
  GET_ALL_FOLDERS,
  ADD_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  ARCHIVE_DOCUMENT,
  SET_LOADING_DOCUMENTS,
  SELECT_DOCUMENT,
  CHANGE_PARENT,
  ERROR,
} from '../actions/types';
import findPreviousParent from '../utils/findPreviousParent';

const initialState = {
  documents: [],
  folders: [],
  loading: false,
  current: null,
  parent: null,
  selectedDocument: {
    _id: null,
    name: null,
  },
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_DOCUMENTS:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ALL_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
        loading: false,
      };
    case GET_ALL_FOLDERS:
      return {
        ...state,
        folders: action.payload,
        loading: false,
      };
    case ADD_FOLDER:
      return {
        ...state,
        documents: [...state.documents, action.payload],
      };
    case UPDATE_FOLDER:
      return {
        ...state,
        documents: state.documents.map((doc) => {
          if (doc.type === 'folder' && doc._id === action.payload._id) {
            return action.payload;
          }
          return doc;
        }),
      };
    case DELETE_FOLDER:
      console.log(action.payload);
      return {
        ...state,
        documents: state.documents.filter(
          (doc) =>
            doc.type === 'document' ||
            (doc.type === 'folder' && doc._id !== action.payload._id)
        ),
      };
    case ADD_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload],
      };
    case UPDATE_DOCUMENT:
      let selectedDoc = state.selectedDocument;

      if (state.selectedDocument._id === action.payload._id) {
        selectedDoc = action.payload;
      }

      return {
        ...state,
        documents: state.documents.map((doc) => {
          if (doc.type === 'document' && doc._id === action.payload._id) {
            return action.payload;
          }
          return doc;
        }),
        selectedDocument: selectedDoc,
      };

    case ARCHIVE_DOCUMENT:
      console.log(action.payload);
      return {
        ...state,
        documents: state.documents.filter(
          (doc) =>
            doc.type === 'folder' ||
            (doc.type === 'document' && doc._id !== action.payload._id)
        ),
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
        parent: previousParent,
      };
    case SELECT_DOCUMENT:
      return {
        ...state,
        selectedDocument: action.payload,
      };
    default:
      return state;
  }
};
