import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
//Components
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import io from 'socket.io-client';

const theme = createMuiTheme({
  palette: {}
});

if (localStorage.token) {
  axios.defaults.headers.common['Auth'] = localStorage.token;
} else {
  delete axios.defaults.headers.common['Auth'];
}

const socket = io('https://revisioncheck.herokuapp.com/');
socket.on('connect', function(soc) {
  socket.on('connection:sid', function(socketId) {
    localStorage.socketId = socketId;
  });

  socket.on('folder', function(folder) {
    console.log(folder);
  });
});

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
