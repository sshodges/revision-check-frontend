import {
  ADD_FOLDER,
  ADD_REVISION,
  UPDATE_REVISION,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  UPDATE_ARCHIVES,
  ARCHIVE_DOCUMENT,
} from './types';

export const addFolder = (folder) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_FOLDER,
      payload: folder,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addRevision = (revision) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_REVISION,
      payload: revision,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateRevision = (revision) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_REVISION,
      payload: revision,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateFolder = (folder) => async (dispatch) => {
  try {
    console.log(folder);
    dispatch({
      type: UPDATE_FOLDER,
      payload: folder,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = (folder) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_FOLDER,
      payload: folder,
    });

    folder.deletedDocuments.forEach((doc) => {
      dispatch({
        type: ARCHIVE_DOCUMENT,
        payload: doc,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const addDocument = (document) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DOCUMENT,
      payload: document,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateDocument = (document) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DOCUMENT,
      payload: document,
    });

    dispatch({
      type: UPDATE_ARCHIVES,
      payload: document,
    });
  } catch (error) {
    console.log(error);
  }
};

export const archiveDocument = (document) => async (dispatch) => {
  try {
    dispatch({
      type: ARCHIVE_DOCUMENT,
      payload: document._id,
    });
  } catch (error) {
    console.log(error);
  }
};
