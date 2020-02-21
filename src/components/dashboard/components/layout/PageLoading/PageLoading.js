import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './PageLoading-styles';

export default function SimpleBackdrop() {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}
