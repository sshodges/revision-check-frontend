import { CHANGE_COLOR_THEME } from '../actions/types';

const initialState = {
  preferredTheme: 'light',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COLOR_THEME:
      return {
        ...state,
        preferredTheme: action.payload,
      };
    default:
      return state;
  }
};
