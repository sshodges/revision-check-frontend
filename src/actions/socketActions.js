import { ADD_FOLDER, UPDATE_FOLDER, DELETE_FOLDER } from './types';

export const addFolder = folder => async dispatch => {
  try {
    dispatch({
      type: ADD_FOLDER,
      payload: folder
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateFolder = folder => async dispatch => {
  try {
    dispatch({
      type: UPDATE_FOLDER,
      payload: folder
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = folder => async dispatch => {
  try {
    dispatch({
      type: DELETE_FOLDER,
      payload: folder
    });
  } catch (error) {
    console.log(error);
  }
};

export const addDocument = folder => async dispatch => {
  try {
    dispatch({
      type: ADD_FOLDER,
      payload: folder
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateDocument = folder => async dispatch => {
  try {
    dispatch({
      type: ADD_FOLDER,
      payload: folder
    });
  } catch (error) {
    console.log(error);
  }
};

export const archiveDocument = folder => async dispatch => {
  try {
    dispatch({
      type: ADD_FOLDER,
      payload: folder
    });
  } catch (error) {
    console.log(error);
  }
};
