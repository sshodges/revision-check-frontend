import { makeStyles } from '@material-ui/core/styles';

const useStylesLight = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#63A461',
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    color: 'white',
  },
}));

const useStylesDark = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#579156',
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    color: 'white',
  },
}));

export { useStylesLight, useStylesDark };
