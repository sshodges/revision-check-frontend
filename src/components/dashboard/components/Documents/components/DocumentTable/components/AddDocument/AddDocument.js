import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addDocument } from 'actions/documentActions';
// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// Internal Components
import ErrorMessage from 'components/Dashboard/components/layout/ErrorMessage';
import SuccessMessage from 'components/Dashboard/components/layout/SuccessMessage';

const AddDocument = ({ document: { current }, addDocument, open, setOpen }) => {
  const [documentName, setDocumentName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const saveDocument = async () => {
    if (documentName === '') {
      return;
    }
    setLoading(true);

    let folder = {
      name: documentName,
      parent: current,
    };

    const res = await addDocument(folder);

    setLoading(false);

    if (res === 'duplicate') {
      setErrorMessage('A document with that name already exists');
      return;
    }

    setOpen(false);
    setSuccessMessage('Document added');
  };

  const keyPressed = (event) => {
    if (event.key === 'Enter') {
      saveDocument();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Document</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Document Name'
            type='text'
            fullWidth
            onKeyPress={keyPressed}
            onChange={(e) => setDocumentName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={saveDocument} color='primary'>
            {loading ? <CircularProgress size={18} /> : 'Save'}
          </Button>
        </DialogActions>

        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            clearError={() => setErrorMessage('')}
          />
        )}
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
  addDocument,
})(AddDocument);
