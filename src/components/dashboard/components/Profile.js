import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginTop: 20
  },
  avatar: {
    width: 50,
    height: 50
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Sam Hodges',
    avatar: '/images/avatars/avatar_11.png',
    company: '4mation Technologies'
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt='Person'
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to='/settings'
      />
      <Typography className={classes.name} variant='h5'>
        {user.name}
      </Typography>
      <Typography variant='body2'>{user.company}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
