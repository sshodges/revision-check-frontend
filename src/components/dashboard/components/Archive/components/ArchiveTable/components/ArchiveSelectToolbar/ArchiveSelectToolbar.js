import React from 'react';
import { connect } from 'react-redux';
import { updateDocument, deleteFolder } from 'actions/documentActions';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import Tooltip from '@material-ui/core/Tooltip';
// Internal Components

const ArchiveSelectToolbar = ({
  setSelectedRows,
  updateDocument,
  rowData,
  handleSuccess,
}) => {
  const activate = async () => {
    await updateDocument(rowData[0], { status: true, parent: null });
    handleSuccess(`Document "${rowData[4]}" activated`);
  };

  return (
    <span style={{ marginRight: 20 }}>
      <Tooltip title='Activate'>
        <IconButton onClick={activate}>
          <CheckBoxOutlinedIcon style={{ color: '#62A461' }} />
        </IconButton>
      </Tooltip>

      <Tooltip title='Cancel'>
        <IconButton onClick={() => setSelectedRows([])}>
          <ClearOutlinedIcon />
        </IconButton>
      </Tooltip>
    </span>
  );
};

export default connect(null, {
  updateDocument,
  deleteFolder,
})(ArchiveSelectToolbar);
