import React, { useState } from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Typography, Button } from '@material-ui/core';
import DocumentSettings from '../DocumentSettings/DocumentSettings';

const TitleBar = ({ document: { selectedDocument }, backFunction }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={() => backFunction()} style={{ marginTop: 10 }}>
        <ArrowBackIcon />
      </IconButton>
      <div style={{ marginTop: 10, marginLeft: 30 }}>
        <Typography variant='h5'>{selectedDocument.name}</Typography>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          style={{ marginTop: 10, marginBottom: 15 }}
          onClick={() => setOpen(true)}
        >
          Settings
        </Button>
      </div>

      <DocumentSettings open={open} setOpen={setOpen} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  document: state.document,
});

export default connect(mapStateToProps, {})(TitleBar);
