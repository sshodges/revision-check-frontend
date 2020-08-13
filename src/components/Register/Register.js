import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
} from '@material-ui/core';
import { useStyles } from './Register-styles';
import Container from '@material-ui/core/Container';
import Copyright from '../Dashboard/components/layout/Copyright';
import Logo from 'assets/img/logo.png';
import ErrorMessage from '../Dashboard/components/layout/ErrorMessage';
// Actions
import {
  registerUser,
  setLoading,
  clearError,
  getUser,
} from '../../actions/authActions';

const Register = ({
  auth: { isAuthenticated, loading, error },
  registerUser,
  setLoading,
  clearError,
}) => {
  const classes = useStyles();
  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Validation Messages
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(
    false
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  // Confirm User
  const [registerError, setRegisterError] = useState('');
  const [registered, setRegistered] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }

    const payload = {
      firstName,
      lastName,
      companyName,
      email,
      password,
    };

    setLoading();
    const res = await registerUser(payload);

    if (res.status === 200) {
      setRegistered(true);
      return;
    }

    setRegisterError(res.data.errorMessage);

    console.log(res);
  };

  // Validate password on blur
  const onPasswordBlur = () => {
    let errors = [];

    // Check length must be 8+ chars
    if (password.length < 8) {
      errors.push(' be at least 8 charaters long');
    }

    // Must contain number
    if (!password.match(/\d/)) {
      errors.push(' contain a number');
    }

    // Must contain 1 uppercase char
    if (!password.match(/[A-Z]/)) {
      errors.push('contain one uppercase character');
    }

    if (errors.length > 0) {
      setShowPasswordError(true);
      setPasswordError('Password must ' + errors.join(', '));
      return;
    }

    setShowPasswordError(false);
    setPasswordError('');
  };

  const onConfirmBlur = () => {
    if (password !== confirmPassword) {
      setShowConfirmPasswordError(true);
      setConfirmPasswordError("Passwords don't match");
      return;
    }
    setShowConfirmPasswordError(false);
    setConfirmPasswordError('');
  };

  const handleClearError = () => {
    clearError();
  };

  // Redirect verify user on register
  if (registered) {
    return <Redirect to={`/verify/${email}`} />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Logo} className={classes.logo} alt='Revision Check logo' />

        <form className={classes.form} onSubmit={register}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='first-name'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='last-name'
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='companyName'
                label='Company Name'
                name='companyName'
                autoComplete='company-name'
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={showPasswordError}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                onBlur={onPasswordBlur}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={showConfirmPasswordError}
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='confirm-password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={onConfirmBlur}
                helperText={confirmPasswordError}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox value='allowExtraEmails' color='primary' required />
                }
                label='I agree to the Terms & Conditions'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Register
          </Button>

          {registerError && (
            <ErrorMessage
              message={registerError}
              clearError={handleClearError}
            />
          )}

          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
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
  registerUser,
  getUser,
  setLoading,
  clearError,
})(Register);
