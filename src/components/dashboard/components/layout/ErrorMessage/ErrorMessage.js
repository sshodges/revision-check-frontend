import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from './ErrorMessage-styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function ErrorMessage({ message, clearError }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    clearError();
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error'>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
