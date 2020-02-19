import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

export default function Breadcrumb({ current, previous, handleBack }) {
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {current.id !== 0 && (
        <Typography
          color='primary'
          onClick={() => {
            handleBack(previous.id);
          }}
          style={{cursor: 'pointer'}}
        >
          {previous.name}
        </Typography>
      )}
      <Typography color='textPrimary'>{current && current.name}</Typography>
    </Breadcrumbs>
  );
}
