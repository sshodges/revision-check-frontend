import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#63A461'
  },
  title: {
    flexGrow: 1
  }
}));

export { useStyles };
