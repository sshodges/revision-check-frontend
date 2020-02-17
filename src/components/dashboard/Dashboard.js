import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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

export default function Dashboard() {
  const classes = useStyles();

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
}
