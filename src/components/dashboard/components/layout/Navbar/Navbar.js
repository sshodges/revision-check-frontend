import React from 'react';
import { useStyles } from './Navbar-styles';
import AppBar from '@material-ui/core/AppBar';
import InputIcon from '@material-ui/icons/Input';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { logout } from 'actions/authActions';
import store from 'store';
import { IconButton } from '@material-ui/core';

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Revision Check
        </Typography>
        <IconButton onClick={() => store.dispatch(logout())}>
          <InputIcon color='inherit' className={classes.logout} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
