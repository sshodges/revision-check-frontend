import React from 'react';
import { connect } from 'react-redux';
import { updateColorPreference } from 'actions/layoutActions';
import { useStylesLight, useStylesDark } from './Navbar-styles';
import { logout } from 'actions/authActions';
import store from 'store';
import {
  IconButton,
  Tooltip,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

export const Navbar = ({
  layout: { preferredTheme },
  updateColorPreference,
}) => {
  const lightStyle = useStylesLight();
  const darkStyle = useStylesDark();
  const classes = preferredTheme === 'light' ? lightStyle : darkStyle;

  const updateTeme = (theme) => {
    localStorage.setItem('preferredTheme', theme);
    updateColorPreference(theme);
  };

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Revision Check
        </Typography>
        <Tooltip title='Toggle light/dark theme'>
          {preferredTheme === 'dark' ? (
            <IconButton
              onClick={() => updateTeme('light')}
              className='toggle-theme'
            >
              <Brightness4Icon color='inherit' className={classes.logout} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => updateTeme('dark')}
              className='toggle-theme'
            >
              <Brightness7Icon color='inherit' className={classes.logout} />
            </IconButton>
          )}
        </Tooltip>
        <Tooltip title='Logout'>
          <IconButton onClick={() => store.dispatch(logout())}>
            <InputIcon color='inherit' className={classes.logout} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  layout: state.layout,
});

export default connect(mapStateToProps, {
  updateColorPreference,
})(Navbar);
