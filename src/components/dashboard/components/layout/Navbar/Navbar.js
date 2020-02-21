import React from 'react';
import { useStyles } from './Navbar-styles';
import AppBar from '@material-ui/core/AppBar';
import InputIcon from '@material-ui/icons/Input';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Revision Check
        </Typography>
        <InputIcon color='inherit' />
      </Toolbar>
    </AppBar>
  );
}
