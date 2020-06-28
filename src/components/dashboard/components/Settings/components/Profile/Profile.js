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
} from '@material-ui/core';

const Profile = ({ auth: { user, loading }, updateUser, setLoading }) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    account: {
      companyName: '',
    },
  });

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      companyName: user.account.companyName,
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

    await updateUser(values);

    setUpdating(false);
  };

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
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Phone Number'
                margin='dense'
                name='phone'
                onChange={handleChange}
                type='phone'
                value={values.phone}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color='primary' variant='contained' onClick={() => update()}>
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateUser, setLoading })(Profile);
