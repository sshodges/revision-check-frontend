import React from 'react';
import { useStyles } from '../../../Login/Login-styles';

import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  CircularProgress,
} from '@material-ui/core';
import Copyright from 'components/Layout/Copyright';
import Logo from 'components/Layout/Logo';

export const Stage1 = ({ setEmail, sendCode, loading }) => {
  const classes = useStyles();
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={sendCode}>
          <a href='/login'>
            <Logo logoClass={classes.logo} />
          </a>

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            type='email'
            autoComplete='email'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
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
              'Send Verification Code'
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
