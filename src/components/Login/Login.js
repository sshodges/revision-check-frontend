import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// Actions
import {
  loginUser,
  setLoading,
  logout,
  clearError,
  getUser,
} from '../../actions/authActions';
// Material UI Components
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { useStyles } from './Login-styles';
// Other Components
import Copyright from '../Layout/Copyright';
import ErrorMessage from '../Layout/ErrorMessage';
import PageLoading from '../Layout/PageLoading';
import Logo from '../Layout/Logo';

const Login = ({
  auth: { isAuthenticated, loading },
  loginUser,
  logout,
  getUser,
  setLoading,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingPage, setLoadingPage] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user already logged in
    async function asyncGetUser() {
      await getUser().catch((err) => logout());
      setLoadingPage(false);
      setLoading(false);
    }
    asyncGetUser();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const login = async (e) => {
    e.preventDefault();

    setLoading();
    await loginUser(email, password).catch((err) => setError(err.message));
  };
  let inputStyle = {};
  if (localStorage.preferredTheme === 'dark')
    inputStyle = { WebkitBoxShadow: '0 0 0 1000px #6aa9da inset' };

  // Redirect user to dashboard if logged in
  if (isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  if (!loadingPage) {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={login}>
            <Logo logoClass={classes.logo} />
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
              inputProps={{ style: inputStyle }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ style: inputStyle }}
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
                'Login'
              )}
            </Button>

            {error && (
              <ErrorMessage message={error} clearError={() => setError('')} />
            )}

            <Grid container>
              <Grid item xs>
                <Link href='/forgot-password' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
  return <PageLoading />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loginUser,
  getUser,
  logout,
  setLoading,
  clearError,
})(Login);
