import React, { Fragment } from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Typography } from '@material-ui/core';

const LatestRevision = () => {
  return (
    <Fragment>
      <CheckCircleOutlineIcon
        style={{
          fontSize: 150,
          color: '#63A461',
        }}
      />
      <Typography variant='h3' align='center' gutterBottom>
        This is the latest revision
      </Typography>
    </Fragment>
  );
};

export default LatestRevision;
