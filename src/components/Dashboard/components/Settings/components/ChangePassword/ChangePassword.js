import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { changePassword } from 'actions/authActions';
import ErrorMessage from '../../../../../Layout/ErrorMessage';
import SuccessMessage from '../../../../../Layout/SuccessMessage';

const ChangePassword = ({ auth: { user, loading }, changePassword }) => {
  const [values, setValues] = useState({
    currentPassword: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submitChangePassword = async () => {
    const { currentPassword, password, confirm } = values;
    if (password !== confirm) {
      setError('passwords do not match');
    }

    if (!currentPassword) {
      setError('Please enter your current password');
    }

    if (password.length < 6) {
      setError('New password must be at least 6 characters long');
    }

    const res = await changePassword(
      user.email,
      currentPassword,
      password
    ).catch((err) => {
      setError(err.message);
    });

    if (res) {
      setValues({
        currentPassword: '',
        password: '',
        confirm: '',
      });
      setMessage('Password successfully changed');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Card>
      <form>
        <CardHeader subheader='Update password' title='Password' />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label='Current Password'
            name='currentPassword'
            onChange={handleChange}
            type='password'
            value={values.currentPassword}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Password'
            name='password'
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type='password'
            value={values.password}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Confirm password'
            name='confirm'
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type='password'
            value={values.confirm}
            variant='outlined'
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            onClick={() => submitChangePassword()}
          >
            Update
          </Button>
        </CardActions>
      </form>
      {error && (
        <ErrorMessage message={error} clearError={() => setError('')} />
      )}
      {message && (
        <SuccessMessage message={message} clearMessage={() => setMessage('')} />
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
