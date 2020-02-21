import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginTop: 20,
    marginBottom: 10
  },
  avatar: {
    width: 50,
    height: 50
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

export { useStyles };
