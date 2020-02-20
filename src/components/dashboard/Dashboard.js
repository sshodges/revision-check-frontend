import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { useStyles } from './Dashboard-styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Websocket from 'utils/websocket';
// Actions
import { getUser, setLoading } from '../../actions/authActions';
// Other Components
import Sidebar from './components/layout/Sidebar/Sidebar';
import Navbar from './components/layout/Navbar/Navbar';
import Documents from './components/Documents/Documents';

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
    new Websocket(user.id);
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
