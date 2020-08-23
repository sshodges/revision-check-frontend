import React, { useState } from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Typography, Button, Badge } from '@material-ui/core';
import DocumentSettings from '../DocumentSettings/DocumentSettings';
import FollowersSettings from '../FollowersSettings';

const TitleBar = ({ document: { selectedDocument }, backFunction }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  const pendingFollowers = selectedDocument?.followers
    ? selectedDocument.followers.filter(
        (follower) => !follower.approved && !follower.blocked
      ).length
    : 0;

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

        {selectedDocument.allowFollowers &&
          selectedDocument.followers?.length > 0 && (
            <Badge
              badgeContent={pendingFollowers}
              color='primary'
              max={99}
              style={{ marginTop: 10 }}
            >
              <Button
                size='small'
                variant='outlined'
                color='secondary'
                style={{ marginBottom: 15, marginLeft: 20 }}
                onClick={() => setShowFollowers(true)}
              >
                Followers
              </Button>
            </Badge>
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
