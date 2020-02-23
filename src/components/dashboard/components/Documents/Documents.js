import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Actions
import { getAllDocuments } from 'actions/documentActions';
// Interal Components
import DocumentTable from './components/DocumentTable';

const Documents = ({ getAllDocuments }) => {
  useEffect(() => {
    getAllDocuments();
  }, [getAllDocuments]);

  return <DocumentTable />;
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, {
  getAllDocuments
})(Documents);
