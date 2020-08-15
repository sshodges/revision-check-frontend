import React from 'react';
import { useStyles } from './Loading-styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function LinearIndeterminate({ loading }) {
  const classes = useStyles();

  if (loading) {
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }

  return null;
}
