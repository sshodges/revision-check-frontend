import React, { Fragment } from 'react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { Typography } from '@material-ui/core';

const OldRevision = () => {
  return (
    <Fragment>
      <CancelOutlinedIcon
        style={{
          fontSize: 150,
          color: '#FF0102',
        }}
      />
      <Typography variant='h3' align='center' gutterBottom>
        This is not the latest version
      </Typography>
    </Fragment>
  );
};

export default OldRevision;
