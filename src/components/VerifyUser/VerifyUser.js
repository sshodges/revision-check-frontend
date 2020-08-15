import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, CssBaseline, TextField, Grid, Box } from '@material-ui/core';
import { useStyles } from '../Register/Register-styles';
import Container from '@material-ui/core/Container';
import Copyright from '../Layout/Copyright';
import SuccessMessage from '../Layout/SuccessMessage';
import ErrorMessage from '../Layout/ErrorMessage';
// Actions
import {
  resendVerifyCode,
  verifyUser,
  setLoading,
  clearError,
  getUser,
} from '../../actions/authActions';
import Logo from '../Layout/Logo';

const VerifyUser = ({ verifyUser, resendVerifyCode, match }) => {
  const classes = useStyles();
  const [verified, setVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const email = match.params?.email;

  const sendConfirmationCode = async () => {
    const payload = {
      email,
      verificationCode,
    };

    const res = await verifyUser(payload).catch((err) => {
      console.log(err);
      setMessage('');
      setError(err.message);
    });

    if (res) {
      setVerified(true);
    }
  };

  const resendCode = async () => {
    const payload = {
      email,
    };

    const res = await resendVerifyCode(payload).catch((err) => {
      console.log(err);
      setMessage('');
      setError(err.message);
      return;
    });

    if (res) {
      setError('');
      setMessage(`A new verification code has been sent`);
      return;
    }
  };

  // Redirect to login screen if no email passed in
  if (!email) {
    return <Redirect to='/login' />;
  }

  // Redirect verify user on register
  if (verified) {
    return <Redirect to='/login' />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <a href='/login'>
          <Logo logoClass={classes.logo} />
        </a>
        <h4>A verification code was sent to: {email}</h4>
        {error && (
          <ErrorMessage message={error} clearError={() => setError('')} />
        )}
        {message && (
          <SuccessMessage
            message={message}
            clearMessage={() => setMessage('')}
          />
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              fullWidth
              label='Verification Code'
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={() => sendConfirmationCode()}
        >
          Confirm
        </Button>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={() => resendCode()}
        >
          Resend Code
        </Button>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  resendVerifyCode,
  verifyUser,
  getUser,
  setLoading,
  clearError,
})(VerifyUser);
