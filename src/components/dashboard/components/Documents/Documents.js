import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Actions
import { getAllDocuments, setLoading } from 'actions/documentActions';
// Interal Components
import DocumentTable from './components/DocumentTable';

const Documents = ({ getAllDocuments, setLoading }) => {
  useEffect(() => {
    setLoading();
    getAllDocuments();
  }, [getAllDocuments, setLoading]);

  return <DocumentTable />;
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, {
  getAllDocuments,
  setLoading
})(Documents);
