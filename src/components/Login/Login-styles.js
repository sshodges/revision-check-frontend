import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    width: '80%',
    marginLeft: '10%',
    marginBottom: 40
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    minHeight: 40
  }
}));

export { useStyles };
