import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addRevision } from 'actions/revisionActions';
// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// Internal Components
import SuccessMessage from 'components/Layout/SuccessMessage';

const AddRevision = ({
  document: { selectedDocument },
  addRevision,
  open,
  setOpen,
}) => {
  const [revisionName, setRevisionName] = useState('');
  const [revisionNote, setRevisionNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const saveRevision = async () => {
    if (revisionName === '') {
      return;
    }
    const revision = {
      name: revisionName,
      note: revisionNote,
      document: selectedDocument._id,
    };
    setLoading(true);

    await addRevision(revision);

    setLoading(false);
    setOpen(false);
    setSuccessMessage('Revision added');
  };

  const keyPressed = (event) => {
    if (event.key === 'Enter') {
      saveRevision();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Revision</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Revision Name'
            type='text'
            fullWidth
            onKeyPress={keyPressed}
            variant='outlined'
            onChange={(e) => setRevisionName(e.target.value)}
            inputProps={{
              autoComplete: 'off',
            }}
          />
          <TextField
            id='note'
            label='Note'
            rows={4}
            multiline
            fullWidth
            variant='outlined'
            onChange={(e) => setRevisionNote(e.target.value)}
            inputProps={{
              autoComplete: 'off',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={saveRevision} color='primary'>
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

const mapStateToProps = (state) => ({
  document: state.document,
});

export default connect(mapStateToProps, {
  addRevision,
})(AddRevision);
