import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Actions
import { getRevisions } from 'actions/revisionActions';
import { Redirect } from 'react-router-dom';
// Interal Components
import RevisionTable from './components/RevisionTable/RevisionTable';

const Revisions = ({ document: { selectedDocument }, getRevisions }) => {
  useEffect(() => {
    getRevisions(selectedDocument.id);
  }, [getRevisions, selectedDocument.id]);

  if (!selectedDocument.id) {
    return <Redirect to='/' />;
  }
  return <RevisionTable />;
};

const mapStateToProps = state => ({
  document: state.document,
  revision: state.revision
});

export default connect(mapStateToProps, {
  getRevisions
})(Revisions);
