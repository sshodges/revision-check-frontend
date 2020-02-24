import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDocument, deleteFolder } from 'actions/documentActions';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditFolder from '../EditFolder/EditFolder';
import EditDocument from '../EditDocument/EditDocument';

const SelectToolbar = ({ deleteFolder, updateDocument, selectedRow }) => {
  const [rowData] = useState(selectedRow.data);
  const [editFolder, setEditFolder] = useState(false);
  const [editDocument, setEditDocument] = useState(false);

  const onDelete = async () => {
    let id = rowData[0];
    if (rowData[1] === 'folder') {
      await deleteFolder(id);
    } else {
      await updateDocument(id, { status: false });
    }
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
