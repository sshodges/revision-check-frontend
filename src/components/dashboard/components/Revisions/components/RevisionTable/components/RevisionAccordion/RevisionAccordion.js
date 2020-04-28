import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateRevision, uploadDocument } from 'actions/revisionActions';
import { useStyles } from './RevisionAccordion-styles';
import QRCode from 'qrcode.react';
import {
  Grid,
  TableRow,
  TableCell,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { ViewQR } from './components/ViewQR/ViewQR';

const RevisionAccordion = ({
  selectedRevision,
  updateRevision,
  uploadDocument,
  handleSuccess,
  document: { selectedDocument },
  layout: { preferredTheme },
}) => {
  const [revision, setRevision] = useState(selectedRevision[3]);
  const [note, setNote] = useState(selectedRevision[1]);
  const [loading, setLoading] = useState(false);
  const [QROpen, setQROpen] = useState(false);

  const classes = useStyles();
  const colSpan = selectedRevision.length + 1;
  const revcode = selectedRevision[4];
  const revisionId = selectedRevision[0];
  const documentLocation = selectedRevision[2];

  const update = async () => {
    if (revision === '') {
      return;
    }
    setLoading(true);
    const updatedRevision = {
      name: revision,
      note: note,
    };

    await updateRevision(updatedRevision, revisionId);

    handleSuccess('Revision updated');

    setLoading(false);
  };

  const upload = async (e) => {
    let data = new FormData();
    let name = e.target.files[0].name;
    const location = `${selectedDocument.account}/${revcode}/${name}`;

    data.append('file', e.target.files[0]);
    data.append('name', location);
    data.append('revisionId', revisionId);

    return await uploadDocument(data);
  };

  const downloadQR = () => {
    const canvas = document.getElementById(revcode);
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = revcode + '.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <TableRow
      style={{
        backgroundColor: preferredTheme === 'light' ? '#FBFBFB' : '#383838',
      }}
    >
      <TableCell colSpan={colSpan}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={4}>
            <TextField
              label='Revision Name'
              defaultValue={revision}
              className={classes.revision}
              onChange={(e) => setRevision(e.target.value)}
            />

            <TextField
              id='note'
              label='Note'
              multiline
              fullWidth
              rows={4}
              defaultValue={note}
              variant='outlined'
              onChange={(e) => setNote(e.target.value)}
            />

            <Button
              size='small'
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={update}
            >
              {loading ? <CircularProgress size={18} /> : 'Save'}
            </Button>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <div className={classes.right}>
              <Grid item xs={12}>
                <Typography variant='subtitle1'>QR Code</Typography>

                <Button
                  size='small'
                  variant='outlined'
                  color='primary'
                  className={classes.button}
                  onClick={() => downloadQR()}
                >
                  Download
                </Button>

                <QRCode
                  value={`http://revisioncheck/revcode/${revcode}`}
                  size={256}
                  id={revcode}
                  style={{ display: 'none' }}
                />

                <Button
                  size='small'
                  variant='outlined'
                  color='primary'
                  className={classes.button}
                  onClick={() => setQROpen(true)}
                >
                  View
                </Button>
              </Grid>
              {selectedDocument.allowDocumentDownload && (
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant='subtitle1'>Document</Typography>
                  </Grid>

                  {documentLocation && (
                    <Button
                      size='small'
                      variant='outlined'
                      color='primary'
                      className={classes.button}
                      target='_blank'
                      href={documentLocation}
                    >
                      View
                    </Button>
                  )}

                  <Button
                    size='small'
                    variant='outlined'
                    color='primary'
                    startIcon={<CloudUploadIcon />}
                    className={classes.button}
                    component='label'
                  >
                    Upload
                    <input
                      type='file'
                      accept='application/pdf'
                      style={{ display: 'none' }}
                      onChange={upload}
                    />
                  </Button>
                </Grid>
              )}
            </div>
          </Grid>
        </Grid>
        <ViewQR revcode={revcode} open={QROpen} setOpen={setQROpen} />
      </TableCell>
    </TableRow>
  );
};

const mapStateToProps = (state) => ({
  revision: state.revision,
  document: state.document,
  layout: state.layout,
});

export default connect(mapStateToProps, { updateRevision, uploadDocument })(
  RevisionAccordion
);
