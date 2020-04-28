import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Actions
import { getArchives, setLoading } from 'actions/documentActions';
// Interal Components
import ArchiveTable from './components/ArchiveTable';

const Archive = ({ getArchives, setLoading }) => {
  useEffect(() => {
    setLoading();
    getArchives();
  }, [getArchives, setLoading]);

  return <ArchiveTable />;
};

const mapStateToProps = (state) => ({
  document: state.document,
});

export default connect(mapStateToProps, {
  getArchives,
  setLoading,
})(Archive);
