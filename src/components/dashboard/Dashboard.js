import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import io from 'socket.io-client';
import md5 from 'md5';
// Actions
import { getUser, setLoading } from '../../actions/authActions';
// Other Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Documents from '../pages/documents/Documents';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

const Dashboard = ({
  auth: { user, isAuthenticated, loading },
  setLoading,
  getUser
}) => {
  useEffect(() => {
    // Check if user already logged in
    async function asyncGetUser() {
      setLoading();
      await getUser();
    }
    asyncGetUser();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  if (user.id) {
    const socket = io('https://revisioncheck.herokuapp.com/');
    socket.on('connect', function(soc) {
      socket.on('connection:sid', function(socketId) {
        localStorage.socketId = socketId;
      });
    });

    socket.emit('join', md5(user.id));
    socket.on('add folder', function(folder) {
      console.log(folder);
    });

    socket.on('update folder', function(folder) {
      console.log(folder);
    });

    socket.on('delete folder', function(folder) {
      console.log(folder);
    });

    socket.on('add document', function(folder) {
      console.log(folder);
    });

    socket.on('update document', function(folder) {
      console.log(folder);
    });

    socket.on('archive document', function(folder) {
      console.log(folder);
    });
  }

  // Redirect user to login if  not logged in
  if (!isAuthenticated && !loading) {
    return <Redirect to='/login' />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Switch>
            <Route exact path='/' component={Documents} />\{' '}
          </Switch>
        </Router>
      </main>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  getUser,
  setLoading
})(Dashboard);
