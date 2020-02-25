import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDocument, deleteFolder } from 'actions/documentActions';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// Internal Components
import EditFolder from '../EditFolder/EditFolder';
import EditDocument from '../EditDocument/EditDocument';
import DeleteConfirm from '../DeleteConfirm';

const SelectToolbar = ({ deleteFolder, updateDocument, rowData }) => {
  const [editFolder, setEditFolder] = useState(false);
  const [editDocument, setEditDocument] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({});

  const onDelete = async () => {
    let id = rowData[0];
    let title = rowData[4];
    let info = {};
    if (rowData[1] === 'folder') {
      info.heading = `Are you sure you want to delete ${title}?`;
      info.text =
        'Deleting this folder will delete all sub-folders and move all documents to the home directory.';
      info.deleteFunction = () => deleteFolder(id);
    } else {
      info.heading = `Are you sure you want to archive ${title}?`;
      info.text = (
        <span>
          Documents cannot be permanently deleted.
          <br />
          <br />
          Pressing delete will move this document to the archive folder. You can
          reactivate a document at any time.
        </span>
      );
      info.deleteFunction = () => updateDocument(id, { status: false });
    }
    setDeleteInfo(info);
    setDeleteOpen(true);
  };

  const onEdit = async () => {
    if (rowData[1] === 'folder') {
      setEditFolder(true);
    } else {
      setEditDocument(true);
    }
  };

  return (
    <span style={{ marginRight: 20 }}>
      <IconButton onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      <DeleteConfirm
        open={deleteOpen}
        setOpen={setDeleteOpen}
        deleteInfo={deleteInfo}
      />
      <EditFolder open={editFolder} setOpen={setEditFolder} rowData={rowData} />
      <EditDocument
        open={editDocument}
        setOpen={setEditDocument}
        rowData={rowData}
      />
    </span>
  );
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, {
  updateDocument,
  deleteFolder
})(SelectToolbar);
