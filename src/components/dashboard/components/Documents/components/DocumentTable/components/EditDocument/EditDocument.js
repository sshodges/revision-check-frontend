import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDocument } from 'actions/documentActions';
// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const EditDocument = ({ rowData, updateDocument, open, setOpen }) => {
  const [documentName, setDocumentName] = useState(rowData[4]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setDocumentName(rowData[4]);
  };

  const handleClose = () => {
    setOpen(false);
    setDocumentName('');
  };

  const editDocument = async () => {
    if (documentName === '') {
      return;
    }
    setLoading(true);

    let document = {
      name: documentName
    };

    await updateDocument(rowData[0], document);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        onEnter={handleOpen}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit Document</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Document Name'
            type='text'
            fullWidth
            onChange={e => setDocumentName(e.target.value)}
            value={documentName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={editDocument} color='primary'>
            {loading ? <CircularProgress size={18} /> : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(null, {
  updateDocument
})(EditDocument);
