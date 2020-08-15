import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// Actions
import {
  loginUser,
  setLoading,
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
import Logo from 'assets/img/logo.png';
import Copyright from '../Dashboard/components/layout/Copyright';
import ErrorMessage from '../Dashboard/components/layout/ErrorMessage';
import PageLoading from '../Dashboard/components/layout/PageLoading';

const Login = ({
  auth: { isAuthenticated, loading },
  loginUser,
  getUser,
  setLoading,
  clearError,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingPage, setLoadingPage] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user already logged in
    async function asyncGetUser() {
      await getUser().catch((err) => console.log(err));
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
            <img
              src={Logo}
              className={classes.logo}
              alt='Revision Check logo'
            />
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
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
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
  setLoading,
  clearError,
})(Login);
