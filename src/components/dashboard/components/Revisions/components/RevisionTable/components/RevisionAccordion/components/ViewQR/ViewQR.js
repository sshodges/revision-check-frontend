import React from 'react';
import QRCode from 'qrcode.react';
// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ViewQR = ({ revcode, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' style={{ textAlign: 'center' }}>
          Revcode: {revcode}
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <QRCode
            value={`http://revisioncheck/revcode/${revcode}`}
            size={256}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
