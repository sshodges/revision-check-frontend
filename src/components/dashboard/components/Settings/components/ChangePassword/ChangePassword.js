import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
} from '@material-ui/core';

const ChangePassword = () => {
  const [values, setValues] = useState({
    currentPassword: '',
    password: '',
    confirm: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

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
          <Button color='primary' variant='contained'>
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default ChangePassword;
