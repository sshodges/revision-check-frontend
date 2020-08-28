import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginLeft: 50,
  },
  right: {
    float: 'right',
  },
  button: {
    marginRight: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  iconButton: {
    padding: 0,
  },
  editIcon: {
    color: '#547CB3',
    height: 18,
    marginBottom: 2,
  },
  revision: {
    marginBottom: 25,
  },
}));

export { useStyles };
