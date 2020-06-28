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
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';
import Register from './components/Register/Register';
import { lightTheme, darkTheme } from './theme';

if (localStorage.token) {
  axios.defaults.headers.common['auth-token'] = localStorage.token;
} else {
  delete axios.defaults.headers.common['auth-token'];
}

const ThemedApp = ({ layout: { preferredTheme }, updateColorPreference }) => {
  const computerThemePreference = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  useEffect(() => {
    const userThemePreference = localStorage.preferredTheme
      ? localStorage.preferredTheme
      : computerThemePreference;

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
