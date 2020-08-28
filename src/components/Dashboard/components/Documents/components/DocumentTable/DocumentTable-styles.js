import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 20,
    width: 20,
    marginLeft: 0,
    display: 'inline',
    verticalAlign: 'middle',
  },
  text: {
    height: '100%',
    alignItems: 'center',
    display: 'inline',
    verticalAlign: 'middle',
  },
}));

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#2196f3' },
  },
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        '&:nth-child(2)': {
          width: 20,
        },
      },
    },
    MuiTableRow: {
      root: {
        cursor: 'pointer',
      },
    },
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        '&:nth-child(2)': {
          width: 20,
        },
      },
    },
    MuiTableRow: {
      root: {
        cursor: 'pointer',
      },
    },
  },
});

export { useStyles, lightTheme, darkTheme };
