import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDocument, deleteFolder } from 'actions/documentActions';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import Tooltip from '@material-ui/core/Tooltip';
// Internal Components
import EditFolder from '../EditFolder/EditFolder';
import EditDocument from '../EditDocument/EditDocument';
import DeleteConfirm from '../DeleteConfirm';
import MoveItem from '../MoveItem';

const SelectToolbar = ({
  document: { documents },
  deleteFolder,
  updateDocument,
  rowData,
  handleSuccess,
  setSelectedRows,
}) => {
  const [editFolder, setEditFolder] = useState(false);
  const [editDocument, setEditDocument] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [showMove, setShowMove] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({});

  const onDelete = async () => {
    let id = rowData[0];
    let title = rowData[4];
    let info = {};
    if (rowData[1] === 'folder') {
      info.heading = `Are you sure you want to delete ${title}?`;
      info.text =
        'Deleting this folder will delete all sub-folders and move all documents to the home directory.';
      info.deleteFunction = async () => {
        await deleteFolder(id);
        setDeleteOpen(false);
      };
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
      info.deleteFunction = async () => {
        await updateDocument(id, { status: false, parent: null });
        setDeleteOpen(false);
      };
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

  const onMove = async () => {
    setShowMove(true);
  };

  const handleClearRow = () => {
    setSelectedRows([]);
  };

  return (
    <span style={{ marginRight: 20 }}>
      <Tooltip title='Move'>
        <IconButton onClick={onMove}>
          <ControlCameraIcon style={{ color: '#63A461' }} />
        </IconButton>
      </Tooltip>
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
        <IconButton onClick={handleClearRow}>
          <ClearOutlinedIcon />
        </IconButton>
      </Tooltip>

      <DeleteConfirm
        open={deleteOpen}
        setOpen={setDeleteOpen}
        deleteInfo={deleteInfo}
        clearRow={handleClearRow}
      />

      {rowData && (
        <MoveItem
          open={showMove}
          setOpen={setShowMove}
          rowData={rowData}
          handleSuccess={handleSuccess}
          clearRow={handleClearRow}
        />
      )}

      {rowData && (
        <EditFolder
          open={editFolder}
          setOpen={setEditFolder}
          rowData={rowData}
          handleSuccess={handleSuccess}
        />
      )}

      {rowData && (
        <EditDocument
          open={editDocument}
          setOpen={setEditDocument}
          rowData={rowData}
          handleSuccess={handleSuccess}
        />
      )}
    </span>
  );
};

const mapStateToProps = (state) => ({
  document: state.document,
});

export default connect(mapStateToProps, {
  updateDocument,
  deleteFolder,
})(SelectToolbar);
