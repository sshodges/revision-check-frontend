import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// Actions
import { updateUser, setLoading } from 'actions/authActions';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import ErrorMessage from '../../../layout/ErrorMessage';
import SuccessMessage from '../../../layout/SuccessMessage';

const Profile = ({ auth: { user, loading }, updateUser, setLoading }) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      companyName: user.companyName,
    });
    // eslint-disable-next-line
  }, [!loading, user]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const update = async () => {
    setUpdating(true);
    const res = await updateUser(values).catch((err) => console.log(err));

    if (res) {
      setMessage('User profile updated');
    }
    setUpdating(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Card>
      <form autoComplete='off' noValidate>
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='First name'
                margin='dense'
                name='firstName'
                onChange={handleChange}
                required
                value={values.firstName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Last name'
                margin='dense'
                name='lastName'
                onChange={handleChange}
                required
                value={values.lastName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Email Address'
                margin='dense'
                name='email'
                onChange={handleChange}
                required
                value={values.email}
                variant='outlined'
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Phone Number'
                margin='dense'
                name='phone'
                onChange={handleChange}
                value={values.phone}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Company Name'
                margin='dense'
                name='companyName'
                onChange={handleChange}
                value={values.companyName}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color='primary' variant='contained' onClick={() => update()}>
            {updating ? (
              <CircularProgress size={20} color='inherit' />
            ) : (
              'Save Details'
            )}
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

export default connect(mapStateToProps, { updateUser, setLoading })(Profile);
