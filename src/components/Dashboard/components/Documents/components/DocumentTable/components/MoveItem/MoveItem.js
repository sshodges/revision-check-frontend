import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDocument, updateFolder } from 'actions/documentActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core';
import FolderTreeView from '../FolderTreeView';

const MoveItem = ({
  document: { documents },
  rowData,
  handleSuccess,
  clearRow,
  open,
  setOpen,
  updateDocument,
  updateFolder,
}) => {
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState(null);

  let folders = documents.filter((item) => item.type === 'folder');

  const handleClose = () => {
    setParent(null);
    setOpen(false);
  };

  const handleSetParent = (parentItem) => {
    // Dont allow user to select current folder
    if (parentItem === rowData[0]) {
      setParent(null);
      return;
    }

    setParent(parentItem);
  };

  const handleMove = async () => {
    setLoading(true);
    const payload = {
      parent: parent === 'Home' ? null : parent,
    };

    if (rowData[1] === 'folder') {
      await updateFolder(rowData[0], payload);
    } else {
      await updateDocument(rowData[0], payload);
    }
    handleSuccess(rowData[1] + ' moved');
    clearRow();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullWidth={true}
      maxWidth='xs'
    >
      <DialogTitle id='alert-dialog-title'>Move {rowData[1]}</DialogTitle>
      <DialogContent>
        <FolderTreeView
          setParent={handleSetParent}
          folders={folders}
          itemId={rowData[0]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => handleMove()}
          color='primary'
          autoFocus
          disabled={parent === null}
        >
          {loading ? <CircularProgress size={20} color='inherit' /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  document: state.document,
});

export default connect(mapStateToProps, {
  updateDocument,
  updateFolder,
})(MoveItem);
