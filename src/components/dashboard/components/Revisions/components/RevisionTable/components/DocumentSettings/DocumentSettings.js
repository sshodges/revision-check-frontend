import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateDocument } from 'actions/documentActions';
import SuccessMessage from 'components/Dashboard/components/layout/SuccessMessage';

// Material UI
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Divider,
  Collapse,
} from '@material-ui/core';

const DocumentSettings = ({
  document: { selectedDocument },
  updateDocument,
  open,
  setOpen,
}) => {
  const doc = selectedDocument;
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordProtected, setPasswordProtected] = useState(
    doc.passwordProtected
  );
  const [password, setPassword] = useState(doc.password);
  const [allowFollowers, setAllowFollowers] = useState(doc.allowFollowers);
  const [requireApproval, setRequireApproval] = useState(doc.requireApproval);
  const [allowDocumentDownload, setAllowDocumentDownload] = useState(
    doc.allowDocumentDownload
  );

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const editFolder = async () => {
    setLoading(true);

    let folder = {
      passwordProtected,
      password,
      allowFollowers,
      requireApproval,
      allowDocumentDownload,
    };

    await updateDocument(doc._id, folder);
    setLoading(false);
    setOpen(false);
    setSuccessMessage('Document settings updated');
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Document Settings</DialogTitle>
        <DialogContent>
          <div>
            <FormControl component='fieldset'>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={passwordProtected} />}
                  label='Password Protected'
                  onChange={(e) => setPasswordProtected(e.target.checked)}
                />
              </FormGroup>

              <Collapse in={passwordProtected}>
                <TextField
                  margin='dense'
                  id='name'
                  label='Password'
                  type='text'
                  fullWidth
                  variant='outlined'
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: 10 }}
                />
              </Collapse>

              <Divider light />

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={allowFollowers} />}
                  label='Allow Followers'
                  onChange={(e) => setAllowFollowers(e.target.checked)}
                />
              </FormGroup>

              <Collapse in={allowFollowers}>
                <Fragment>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={requireApproval} />}
                      label='Require Approval'
                      onChange={(e) => setRequireApproval(e.target.checked)}
                    />
                  </FormGroup>

                  <Button
                    color='primary'
                    variant='outlined'
                    style={{ marginBottom: 10 }}
                  >
                    Invite
                  </Button>
                </Fragment>
              </Collapse>

              <Divider light />

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={allowDocumentDownload} />}
                  label='Allow Document Download'
                  onChange={(e) => setAllowDocumentDownload(e.target.checked)}
                />
              </FormGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={editFolder} color='primary'>
            {loading ? <CircularProgress size={18} /> : 'Save'}
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
  updateDocument,
})(DocumentSettings);
