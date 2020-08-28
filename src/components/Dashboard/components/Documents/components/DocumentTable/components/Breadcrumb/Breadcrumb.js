import React from 'react';
import { connect } from 'react-redux';
// Actions
import { changeParent } from 'actions/documentActions';
// Material UI
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const Breadcrumb = ({
  document: { documents, parent, current },
  changeParent,
}) => {
  let currentItem = documents.filter((item) => item._id === current);
  currentItem =
    currentItem.length === 0 ? { name: 'Home', _id: null } : currentItem[0];

  let previousItem = documents.filter((item) => item._id === parent);
  previousItem =
    previousItem.length === 0
      ? { name: 'Home', _id: null, parent: null }
      : previousItem[0];

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {currentItem._id !== null ? (
        <Typography
          color='primary'
          onClick={() => {
            changeParent(previousItem._id);
          }}
          style={{ cursor: 'pointer' }}
        >
          {previousItem.name}
        </Typography>
      ) : (
        <Typography />
      )}
      <Typography color='textPrimary'>
        {currentItem && currentItem.name}
      </Typography>
    </Breadcrumbs>
  );
};

const mapStateToProps = (state) => ({
  document: state.document,
});

export default connect(mapStateToProps, {
  changeParent,
})(Breadcrumb);
