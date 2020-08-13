import {
  GET_ALL_DOCUMENTS,
  GET_ALL_FOLDERS,
  GET_ARCHIVES,
  UPDATE_ARCHIVES,
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
  CLEAR_DOCUMENT,
} from '../actions/types';
import findPreviousParent from '../utils/findPreviousParent';

const initialState = {
  documents: [],
  folders: [],
  archives: [],
  loading: true,
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

    case GET_ARCHIVES:
      return {
        ...state,
        archives: action.payload,
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
      // Check if document exists, if not its an archive document getting activated
      const docExists = state.documents.filter(
        (doc) => doc._id === action.payload._id
      );
      if (docExists.length === 0) {
        return {
          ...state,
          documents: [...state.documents, action.payload],
        };
      }

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

    case UPDATE_ARCHIVES:
      return {
        ...state,
        archives: state.archives.filter((doc) => {
          if (doc._id === action.payload._id && action.payload.status) {
            return false;
          }
          return true;
        }),
      };

    case ARCHIVE_DOCUMENT:
      // Find document from ID
      const archivedDoc = state.documents.filter(
        (doc) => doc._id === action.payload
      )[0];

      return {
        ...state,
        documents: state.documents.filter(
          (doc) =>
            doc.type === 'folder' ||
            (doc.type === 'document' && doc._id !== archivedDoc._id)
        ),
        archives: [...state.archives, archivedDoc],
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

    case CLEAR_DOCUMENT:
      return initialState;

    default:
      return state;
  }
};
