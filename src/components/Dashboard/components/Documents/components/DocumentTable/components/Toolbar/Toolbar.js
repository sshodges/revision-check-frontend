import React from 'react';
// Material UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AddFolder from '../AddFolder';
import AddDocument from '../AddDocument';

export default function Toolbar({
  addFolder,
  setAddFolder,
  addDocument,
  setAddDocument
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <span>
      <IconButton
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <AddIcon />
      </IconButton>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setAddFolder(true);
            handleClose();
          }}
        >
          Add Folder
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAddDocument(true);
            handleClose();
          }}
        >
          Add Document
        </MenuItem>
      </Menu>

      <AddFolder open={addFolder} setOpen={setAddFolder} />
      <AddDocument open={addDocument} setOpen={setAddDocument} />
    </span>
  );
}
