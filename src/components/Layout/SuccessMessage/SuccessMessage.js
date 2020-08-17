import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from './SuccessMessage-styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function SuccessMessage({ message, clearMessage }) {
  const classes = useStyles();
  const [open] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    clearMessage();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
