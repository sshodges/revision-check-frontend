import React from 'react';
import { connect } from 'react-redux';
import {
  updateDocument,
  updateFolder,
  deleteDocument,
  deleteFolder
} from 'actions/documentActions';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const SelectToolbar = ({ deleteFolder, deleteDocument, selectedRow }) => {
  const rowData = selectedRow.data;
  console.log(rowData);

  const onDelete = async id => {
    if (rowData[1] === 'folder') {
      await deleteFolder(rowData[0]);
    } else {
      await deleteDocument(rowData[0]);
    }
  };

  return (
    <span style={{ marginRight: 20 }}>
      <IconButton
        onClick={() => {
          console.log('test');
        }}
      >
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </span>
  );
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, {
  updateDocument,
  updateFolder,
  deleteDocument,
  deleteFolder
})(SelectToolbar);
