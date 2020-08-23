import React, { Fragment } from 'react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { Typography, Box } from '@material-ui/core';

const OldRevision = ({ latest }) => {
  const createdDate = new Date(latest?.createdAt)
    .toISOString()
    .substring(0, 10);
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

      <Typography variant='h5' align='center'>
        <Box fontWeight={500} m={1} align='center'>
          <Box fontWeight='fontWeightBold' m={0} display='inline'>
            Latest revision:
          </Box>
          <Box m={0} display='inline'>
            {' ' + latest?.name}
          </Box>
        </Box>
      </Typography>

      <Typography variant='h5' align='center' gutterBottom>
        <Box fontWeight={500} m={0} align='center'>
          <Box fontWeight='fontWeightBold' m={0} display='inline'>
            Created:
          </Box>
          <Box m={1} display='inline'>
            {createdDate}
          </Box>
        </Box>
      </Typography>
    </Fragment>
  );
};

export default OldRevision;
