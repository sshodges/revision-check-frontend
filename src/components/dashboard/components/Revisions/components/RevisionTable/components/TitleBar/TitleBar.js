import React, { useState } from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Typography, Button } from '@material-ui/core';
import DocumentSettings from '../DocumentSettings/DocumentSettings';
import FollowersSettings from '../FollowersSettings/FollowersSettings';

const TitleBar = ({ document: { selectedDocument }, backFunction }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

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
          onClick={() => setShowSettings(true)}
        >
          Settings
        </Button>

        {selectedDocument.allowFollowers && (
          <Button
            size='small'
            variant='outlined'
            color='secondary'
            style={{ marginTop: 10, marginBottom: 15, marginLeft: 20 }}
            onClick={() => setShowFollowers(true)}
          >
            Followers
          </Button>
        )}
      </div>

      <DocumentSettings open={showSettings} setOpen={setShowSettings} />
      <FollowersSettings open={showFollowers} setOpen={setShowFollowers} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  document: state.document,
});

export default connect(mapStateToProps, {})(TitleBar);
