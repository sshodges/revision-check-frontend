import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Actions
import { getRevisions, setLoading } from 'actions/revisionActions';
import { Redirect } from 'react-router-dom';
// Interal Components
import RevisionTable from './components/RevisionTable/RevisionTable';

const Revisions = ({
  document: { selectedDocument },
  getRevisions,
  setLoading,
}) => {
  useEffect(() => {
    setLoading();
    getRevisions(selectedDocument._id);
  }, [getRevisions, selectedDocument._id, setLoading]);

  if (!selectedDocument._id) {
    return <Redirect to='/' />;
  }
  return <RevisionTable />;
};

const mapStateToProps = (state) => ({
  document: state.document,
  revision: state.revision,
});

export default connect(mapStateToProps, {
  getRevisions,
  setLoading,
})(Revisions);
