import React, { Fragment } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

export const BackButton = ({ backFunction, title }) => {
  return (
    <div>
      <IconButton onClick={() => backFunction()}>
        <ArrowBackIcon />
      </IconButton>

      {title}
    </div>
  );
};
