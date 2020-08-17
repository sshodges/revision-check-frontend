import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateFolder } from 'actions/documentActions';
// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const EditFolder = ({
  rowData,
  updateFolder,
  open,
  setOpen,
  handleSuccess,
}) => {
  const [folderName, setFolderName] = useState(rowData ? rowData[4] : '');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setFolderName(rowData[4]);
  };

  const handleClose = () => {
    setOpen(false);
    setFolderName('');
  };

  const editFolder = async () => {
    if (folderName === '') {
      return;
    }
    setLoading(true);

    let folder = {
      name: folderName,
    };
    handleSuccess('Folder updated');

    await updateFolder(rowData[0], folder);

    handleSuccess('Folder updated');
  };

  const keyPressed = (event) => {
    if (event.key === 'Enter') {
      editFolder();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        onEnter={handleOpen}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit Folder</DialogTitle>
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
            value={folderName}
            inputProps={{
              autoComplete: 'off',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editFolder();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={editFolder} color='primary'>
            {loading ? <CircularProgress size={18} /> : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(null, {
  updateFolder,
})(EditFolder);
