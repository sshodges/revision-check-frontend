import React, { useEffect } from 'react';
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
import Sidebar from './components/layout/Sidebar/Sidebar';
import Navbar from './components/layout/Navbar/Navbar';
import Documents from './components/Documents/Documents';
import Revisions from './components/Revisions';
import Archive from './components/Archive/Archive';

const Dashboard = ({
  auth: { user, isAuthenticated, loading },
  setLoading,
  getUser,
  getAllDocuments,
  getArchives,
  setDocumentLoading,
}) => {
  useEffect(() => {
    // Check if user already logged in
    async function asyncGetUser() {
      setLoading();
      await getUser();
    }
    asyncGetUser();

    //Get all Documents
    setDocumentLoading();
    getAllDocuments();
    getArchives();
    // Get all revisions

    // Get all Archives
    // eslint-disable-next-line
  }, [getAllDocuments, setDocumentLoading]);

  const classes = useStyles();

  // Redirect user to login if  not logged in
  if (!isAuthenticated && !loading) {
    return <Redirect to='/login' />;
  }
  console.log(user);
  if (user.account) {
    new Websocket(user.account);
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
