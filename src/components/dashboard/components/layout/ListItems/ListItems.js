import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingIcon from '@material-ui/icons/Settings';

const ListItems = () => {
  return (
    <div>
      <ListItem button component={Link} to='/'>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Archive' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SettingIcon />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItem>
    </div>
  );
};

export default ListItems;
