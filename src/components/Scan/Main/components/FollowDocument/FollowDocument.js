import React, { useState } from 'react';
import { connect } from 'react-redux';
import { followDocument } from 'actions/documentActions';
// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// Internal Components
import SuccessMessage from 'components/Layout/SuccessMessage';
import { Typography } from '@material-ui/core';

const FollowDocument = ({ open, setOpen, data, followDocument }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleFollowDocument = async () => {
    setLoading(true);

    const payload = {
      email,
      documentId: data?.document._id,
    };

    let text = `${email} has been added`;

    if (data?.document.requireApproval) {
      text = 'Your request has been sent';
    }

    setLoading(false);
    await followDocument(payload);
    setOpen(false);
    setSuccessMessage(text);
  };

  const keyPressed = (event) => {
    if (event.key === 'Enter') {
      handleFollowDocument();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullScreen={fullScreen}
      >
        <DialogTitle id='form-dialog-title' style={{ fontSize: 40 }}>
          Follow Changes to Document
        </DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>
            You will be notified as soon as a new revision is created for this
            document
          </Typography>
          <br />

          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            color='secondary'
            fullWidth
            onKeyPress={keyPressed}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              autoComplete: 'off',
            }}
          />

          {data?.document.requireApproval && (
            <Typography gutterBottom color='error'>
              * Notifications for this document require approval from the
              document owner. You will be notified once approved.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleFollowDocument}
            color='primary'
            disabled={!validateEmail(email)}
          >
            {loading ? <CircularProgress size={18} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          clearMessage={() => setSuccessMessage('')}
        />
      )}
    </div>
  );
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default connect(null, {
  followDocument,
})(FollowDocument);
