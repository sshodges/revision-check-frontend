import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import axios from 'axios'
//Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {}
});

if (localStorage.token) {
  axios.defaults.headers.common['Auth'] = localStorage.token;
} else {
  delete axios.defaults.headers.common['Auth'];
}

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
