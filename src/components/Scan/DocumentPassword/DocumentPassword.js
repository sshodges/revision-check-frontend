import React, { useState } from 'react';
import { useStyles } from 'components/Login/Login-styles';

import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import Copyright from 'components/Layout/Copyright';
import Logo from 'components/Layout/Logo';

const DocumentPassword = ({ document, submitPassword, setPassword }) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitPassword();
    setLoading(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmitPassword}>
          <a href='/login'>
            <Logo logoClass={classes.logo} />
          </a>

          <Typography variant='h3' align='center' gutterBottom>
            {document?.name}
          </Typography>

          <Typography variant='h5' align='center' gutterBottom>
            Requires a password to view status
          </Typography>

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Document Password'
            type='password'
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              autoComplete: 'off',
            }}
          />

          <Button
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {loading ? (
              <CircularProgress size={20} color='inherit' />
            ) : (
              'Confirm'
            )}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default DocumentPassword;
