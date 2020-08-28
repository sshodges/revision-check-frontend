import React, { useState } from 'react';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AddRevision from '../AddRevision';

export const RevisionToolbar = () => {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <span>
      <IconButton
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={() => setAddOpen(true)}
      >
        <AddIcon />
      </IconButton>

      <AddRevision open={addOpen} setOpen={setAddOpen} />
    </span>
  );
};
