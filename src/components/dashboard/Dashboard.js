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
import { getUser, setLoading } from 'actions/authActions';
// Other Components
import Sidebar from './components/layout/Sidebar/Sidebar';
import Navbar from './components/layout/Navbar/Navbar';
import Documents from './components/Documents/Documents';
import Revisions from './components/Revisions';

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

  // Redirect user to login if  not logged in
  if (!isAuthenticated && !loading) {
    return <Redirect to='/login' />;
  }

  if (user.id) {
    new Websocket(user.id);
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' component={Documents} />
            <Route exact path='/revisions' component={Revisions} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  getUser,
  setLoading
})(Dashboard);
