import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    height: 20,
    width: 20,
    marginLeft: 0,
    display: 'inline',
    verticalAlign: 'middle'
  },
  text: {
    height: '100%',
    alignItems: 'center',
    display: 'inline',
    verticalAlign: 'middle'
  }
}));

const customTheme = createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        '&:nth-child(2)': {
          width: 20
        }
      }
    },
    MuiTableRow: {
      root: {
        cursor: 'pointer'
      }
    }
  }
});

export { useStyles, customTheme };
