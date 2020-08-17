import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addFolder } from 'actions/documentActions';
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

const AddFolder = ({ document: { current }, addFolder, open, setOpen }) => {
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const saveFolder = async () => {
    if (folderName === '') {
      return;
    }
    setLoading(true);

    let folder = {
      name: folderName,
      parent: current,
    };

    await addFolder(folder);

    setLoading(false);
    setOpen(false);
    setSuccessMessage('Folder added');
  };

  const keyPressed = (event) => {
    if (event.key === 'Enter') {
      saveFolder();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Folder Name'
            type='text'
            fullWidth
            onKeyPress={keyPressed}
            onChange={(e) => setFolderName(e.target.value)}
            inputProps={{
              autoComplete: 'off',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={saveFolder} color='primary'>
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
  addFolder,
})(AddFolder);
