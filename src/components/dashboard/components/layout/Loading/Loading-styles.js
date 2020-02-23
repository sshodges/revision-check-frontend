import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 0,
    padding: 0,
    '& > * + *': {
      margin: 0
    }
  }
}));

export { useStyles };
