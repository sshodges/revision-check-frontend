import React from 'react';
import ChangePassword from './components/ChangePassword';
import Profile from './components/Profile/Profile';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={7} md={6} xl={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item lg={5} md={6} xl={8} xs={12}>
          <ChangePassword />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
