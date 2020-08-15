import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  toolbar: theme.mixins.toolbar
}));

export { useStyles };
