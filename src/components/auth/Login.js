import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// Actions
import {
  loginUser,
  setLoading,
  clearError,
  getUser
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
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Other Components
import Logo from '../../assets/img/logo.png';
import Copyright from '../layout/Copyright';
import ErrorMessage from '../layout/ErrorMessage';
import PageLoading from '../layout/PageLoading';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    width: '80%',
    marginLeft: '10%',
    marginBottom: 40
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    minHeight: 40
  }
}));

const Login = ({
  auth: { isAuthenticated, loading, error },
  loginUser,
  getUser,
  setLoading,
  clearError
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    // Check if user already logged in
    async function asyncGetUser() {
      await getUser();
      setLoadingPage(false);
    }
    asyncGetUser();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const login = async e => {
    e.preventDefault();

    setLoading();
    await loginUser(email, password);
  };

  const handleClearError = () => {
    clearError();
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
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              autoComplete='current-password'
              onChange={e => setPassword(e.target.value)}
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
              <ErrorMessage message={error} clearError={handleClearError} />
            )}

            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  loginUser,
  getUser,
  setLoading,
  clearError
})(Login);
