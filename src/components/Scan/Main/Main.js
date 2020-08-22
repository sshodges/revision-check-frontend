import React, { useState, Fragment } from 'react';
import { useStyles } from 'components/Login/Login-styles';

import {
  Button,
  CssBaseline,
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import Copyright from 'components/Layout/Copyright';
import Logo from 'components/Layout/Logo';
import NotesTable from './components/NotesTable';
import LatestRevision from './components/LatestRevision';
import OldRevision from './components/OldRevision/OldRevision';
import FollowDocument from './components/FollowDocument/FollowDocument';

const Main = ({ payload }) => {
  const classes = useStyles();

  const [showFollowDoc, setShowFollowDoc] = useState(false);

  return (
    <Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Logo logoClass={classes.logo} />

          <Typography
            variant='h1'
            align='center'
            gutterBottom
            color='secondary'
          >
            <Box fontWeight='fontWeightBold' m={1}>
              {payload?.document.name}
            </Box>
          </Typography>
          <Typography variant='h2' align='center'>
            <Box fontWeight={500} m={0} align='center'>
              <Box fontWeight='fontWeightBold' m={0} display='inline'>
                Revision:
              </Box>
              <Box m={1} display='inline'>
                {payload?.revision.name}
              </Box>
            </Box>
          </Typography>
          <Typography variant='h4' align='center' gutterBottom>
            <Box fontWeight={500} m={1} align='center'>
              <Box fontWeight='fontWeightBold' m={0} display='inline'>
                RevCode:
              </Box>
              <Box m={1} display='inline'>
                {payload?.revision.revcode}
              </Box>
            </Box>
          </Typography>

          {payload?.revision?.latest ? <LatestRevision /> : <OldRevision />}
          <div
            style={{
              marginTop: 50,
              marginBottom: 30,
              width: '100%',
            }}
          >
            {payload?.document?.allowFollowers && (
              <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'
                style={{
                  padding: 20,
                  fontWeight: 'bold',
                  marginBottom: 30,
                }}
                onClick={() => setShowFollowDoc(true)}
              >
                Follow This Document
              </Button>
            )}

            {payload?.document?.allowDocumentDownload &&
              payload?.revision?.documentLocation && (
                <Button
                  fullWidth
                  type='submit'
                  variant='contained'
                  color='secondary'
                  className={classes.submit}
                  style={{
                    padding: 20,
                    fontWeight: 'bold',
                    marginBottom: 30,
                    marginTop: 0,
                  }}
                  target='_blank'
                  href={payload?.revision?.documentLocation}
                >
                  View Document
                </Button>
              )}
          </div>

          <NotesTable data={payload?.notes} />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <FollowDocument
        open={showFollowDoc}
        setOpen={setShowFollowDoc}
        data={payload}
      />
    </Fragment>
  );
};

export default Main;
