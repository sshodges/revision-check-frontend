import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getDocumentFollowers,
  approveFollower,
  denyFollower,
} from 'actions/documentActions';
import SuccessMessage from 'components/Layout/SuccessMessage';
// Material UI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const textStyles = {
  display: 'inline-block',
  marginTop: 15,
  marginRight: 5,
};

const FollowersSettings = ({
  document: { selectedDocument },
  getDocumentFollowers,
  open,
  setOpen,
  approveFollower,
  denyFollower,
}) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(null);

  useEffect(() => {
    async function getFollowers() {
      setLoading(false);
      setFollowers(selectedDocument.followers);
    }
    getFollowers();
  }, [getDocumentFollowers, selectedDocument.followers]);

  const pending = followers
    ? followers.filter((follower) => !follower.approved && !follower.blocked)
    : null;
  const blocked = followers
    ? followers.filter((follower) => follower.blocked)
    : null;
  const approved = followers
    ? followers.filter((follower) => follower.approved)
    : null;

  const handleClose = () => {
    setOpen(false);
  };

  const handleApproveFollower = async (followerId) => {
    setLoading(true);

    const payload = {
      followerId,
    };

    await approveFollower(payload);

    reloadFollowers();
    setSuccessMessage('Follower approved');
  };
  const handleDenyFollower = async (followerId) => {
    setLoading(true);
    const payload = {
      followerId,
    };
    await denyFollower(payload);

    reloadFollowers();
    setSuccessMessage('Follower denied');
  };

  const reloadFollowers = async () => {
    setFollowers(null);
    const res = await getDocumentFollowers(selectedDocument?._id);
    setFollowers(res);
    setLoading(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullWidth={true}
        maxWidth='xs'
      >
        <DialogTitle id='form-dialog-title'>Follower Settings</DialogTitle>
        {loading ? (
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        ) : (
          <DialogContent>
            <div>
              {pending?.length > 0 && (
                <Typography
                  variant='h6'
                  color='primary'
                  style={{ marginTop: 10 }}
                >
                  Pending ({pending?.length})
                </Typography>
              )}
              {pending &&
                pending.map((item) => (
                  <div key={item._id}>
                    <Typography gutterBottom style={textStyles}>
                      {item.email}
                    </Typography>
                    <Tooltip title='Approve'>
                      <IconButton
                        onClick={() => handleApproveFollower(item._id)}
                      >
                        <CheckIcon style={{ color: 'green', fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title='Deny Access'>
                      <IconButton onClick={() => handleDenyFollower(item._id)}>
                        <CloseIcon style={{ color: 'red', fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                    <Divider light />
                  </div>
                ))}

              {blocked?.length > 0 && (
                <Typography
                  variant='h6'
                  color='primary'
                  style={{ marginTop: 10 }}
                >
                  Blocked ({blocked?.length})
                </Typography>
              )}
              {blocked &&
                blocked.map((item) => (
                  <div key={item._id}>
                    <Typography gutterBottom style={textStyles}>
                      {item.email}
                    </Typography>
                    <Tooltip title='Approve'>
                      <IconButton
                        onClick={() => handleApproveFollower(item._id)}
                      >
                        <CheckIcon style={{ color: 'green', fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                    <Divider light />
                  </div>
                ))}

              <Typography
                variant='h6'
                color='primary'
                style={{ marginTop: 10 }}
              >
                Followers ({approved?.length})
              </Typography>
              {approved &&
                approved.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <Typography gutterBottom style={textStyles}>
                      {item.email}
                    </Typography>
                    <Tooltip title='Deny Access'>
                      <IconButton onClick={() => handleDenyFollower(item._id)}>
                        <CloseIcon style={{ color: 'red', fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>

                    <Divider light />
                  </div>
                ))}
            </div>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          clearMessage={() => setSuccessMessage('')}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  document: state.document,
});

export default connect(mapStateToProps, {
  getDocumentFollowers,

  approveFollower,
  denyFollower,
})(FollowersSettings);
