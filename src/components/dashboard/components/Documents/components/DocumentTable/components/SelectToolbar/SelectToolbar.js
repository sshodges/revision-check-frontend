import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDocument, deleteFolder } from 'actions/documentActions';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import Tooltip from '@material-ui/core/Tooltip';
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
      <Tooltip title='Edit'>
        <IconButton onClick={onEdit}>
          <EditOutlinedIcon style={{ color: '#547CB3' }} />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete'>
        <IconButton onClick={onDelete}>
          <DeleteOutlineOutlinedIcon style={{ color: '#B35454' }} />
        </IconButton>
      </Tooltip>

      <Tooltip title='Cancel'>
        <IconButton onClick={onDelete}>
          <ClearOutlinedIcon />
        </IconButton>
      </Tooltip>

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
