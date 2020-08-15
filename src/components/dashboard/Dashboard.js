import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { useStyles } from './Dashboard-styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Websocket from 'utils/websocket';
// Actions
import { getUser, setLoading } from 'actions/authActions';
import {
  getAllDocuments,
  getArchives,
  setDocumentLoading,
} from 'actions/documentActions';
// Other Components
import Sidebar from '../Layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Documents from './components/Documents';
import Revisions from './components/Revisions';
import Archive from './components/Archive';
import Settings from './components/Settings';

const Dashboard = ({
  auth: { user, isAuthenticated, loading },
  setLoading,
  getUser,
  getAllDocuments,
  getArchives,
  setDocumentLoading,
}) => {
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    // Check if user already logged in
    async function asyncGetUser() {
      await setLoading();
      await getUser().catch((err) => {
        console.log(err);
      });
      setUserLoading(false);
      setLoading(false);
      //Get all Documents
      await setDocumentLoading();
      await getAllDocuments();
      await getArchives();
    }
    asyncGetUser();

    // Get all revisions

    // Get all Archives
    // eslint-disable-next-line
  }, [getAllDocuments, setDocumentLoading, setLoading]);

  const classes = useStyles();

  // Redirect user to login if  not logged in
  if (!isAuthenticated && !loading && !userLoading) {
    console.log(loading);
    return <Redirect to='/login' />;
  }

  if (user.account?._id) {
    new Websocket(user.account._id);
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
            <Route exact path='/document' component={Revisions} />
            <Route exact path='/archive' component={Archive} />
            <Route exact path='/settings' component={Settings} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUser,
  getAllDocuments,
  getArchives,
  setDocumentLoading,
  setLoading,
})(Dashboard);
