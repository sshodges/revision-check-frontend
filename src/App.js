import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import axios from 'axios';
// Actions
import { updateColorPreference } from './actions/layoutActions';
// Components
import Dashboard from './components/Dashboard/Dashboard.js';
import Login from './components/Login';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';
import Register from './components/Register';
import { lightTheme, darkTheme } from './theme';
import VerifyUser from './components/VerifyUser';
import ForgotPassword from './components/ForgotPassword';
import Scan from './components/Scan';

if (localStorage.token) {
  axios.defaults.headers.common['auth-token'] = localStorage.token;
} else {
  delete axios.defaults.headers.common['auth-token'];
}

const ThemedApp = ({ layout: { preferredTheme }, updateColorPreference }) => {
  const computerThemePreference = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  if (!localStorage.preferredTheme) {
    localStorage.setItem('preferredTheme', computerThemePreference);
  }

  useEffect(() => {
    const userThemePreference = localStorage.preferredTheme;

    updateColorPreference(userThemePreference);
  }, [preferredTheme, computerThemePreference, updateColorPreference]);

  const theme = preferredTheme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/verify/:email' component={VerifyUser} />
            <Route exact path='/forgot-password' component={ForgotPassword} />
            <Route exact path='/revcheck/:revcode' component={Scan} />
            <Dashboard />
          </Switch>
        </Fragment>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  layout: state.layout,
});

const ConnectedThemedApp = connect(mapStateToProps, {
  updateColorPreference,
})(ThemedApp);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedThemedApp />
    </Provider>
  );
};

export default App;
