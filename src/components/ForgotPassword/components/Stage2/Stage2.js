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
import Logo from 'assets/img/logo.png';
import Copyright from '../../../Dashboard/components/layout/Copyright';

export const Stage2 = ({
  setVerifyCode,
  setPassword,
  setConfirmPassword,
  sendResetPassword,
  loading,
}) => {
  const classes = useStyles();
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={sendResetPassword}>
          <a href='/login'>
            <img
              src={Logo}
              className={classes.logo}
              alt='Revision Check logo'
            />
          </a>

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Verification Code'
            type='text'
            autoFocus
            onChange={(e) => setVerifyCode(e.target.value)}
            inputProps={{
              autoComplete: 'off',
            }}
          />

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='New Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              autoComplete: 'new-password',
            }}
          />

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Confirm Password'
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            inputProps={{
              autoComplete: 'confirm-password',
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
              'Reset Password'
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
