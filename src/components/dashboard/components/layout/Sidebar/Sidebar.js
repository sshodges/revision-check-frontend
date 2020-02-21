import React from 'react';
import { useStyles } from './Sidebsar-styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItems from '../ListItems/ListItems';
import Profile from '../Profile/Profile';

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <Profile />
      <Divider className={classes.divider} />
      <List>
        <ListItems />
      </List>
    </Drawer>
  );
}
