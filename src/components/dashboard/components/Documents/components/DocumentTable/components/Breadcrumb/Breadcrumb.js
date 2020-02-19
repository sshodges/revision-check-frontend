import React from 'react';
import { connect } from 'react-redux';
// Actions
import {
  changeParent
} from 'actions/documentActions';
// Material UI
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const Breadcrumb = ({ document: { documents, parent, current }, changeParent}) => {

  let currentItem = documents.filter(item => item.id === current);
  currentItem =
    currentItem.length === 0 ? { name: 'Home', id: 0 } : currentItem[0];

  let previousItem = documents.filter(item => item.id === parent);
  previousItem =
    previousItem.length === 0
      ? { name: 'Home', id: 0, parent: 0 }
      : previousItem[0];

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {currentItem.id !== 0 ? (
        <Typography
          color='primary'
          onClick={() => {
            changeParent(previousItem.id);
          }}
          style={{cursor: 'pointer'}}
        >
          {previousItem.name}
        </Typography>
      ) : <Typography />}
      <Typography color='textPrimary'>{currentItem && currentItem.name}</Typography>
    </Breadcrumbs>
  );
}

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, {
  changeParent
})(Breadcrumb);