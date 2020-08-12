import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles } from './Profile-styles';
import { Avatar, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Profile = ({ auth: { user, loading } }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt='Person'
        className={classes.avatar}
        component={RouterLink}
        src='/images/avatars/avatar_11.png'
        to='/settings'
      />
      <Typography className={classes.name} variant='h5'>
        {loading ? (
          <CircularProgress size={22} />
        ) : (
          `${user.firstName} ${user.lastName}`
        )}
      </Typography>
      {loading ? (
        <CircularProgress size={14} />
      ) : (
        <Typography variant='body2'>{user.account?.companyName}</Typography>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Profile);
