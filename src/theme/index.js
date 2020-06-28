import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';

const lightTheme = createMuiTheme({
  palette,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export { lightTheme, darkTheme };
