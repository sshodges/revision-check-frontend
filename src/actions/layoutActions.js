import { CHANGE_COLOR_THEME } from './types';

export const updateColorPreference = (color) => (dispatch) => {
  return dispatch({
    type: CHANGE_COLOR_THEME,
    payload: color,
  });
};
