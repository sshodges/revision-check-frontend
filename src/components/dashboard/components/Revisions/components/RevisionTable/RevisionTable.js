import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
// Styles
import { lightTheme, darkTheme } from './RevisionTable-styles';
// Actions
import { clearRevisions } from 'actions/revisionActions';
// Material UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
// Internal Components
import Loading from '../../../../../Layout/Loading';
import TitleBar from './components/TitleBar';
import { RevisionToolbar } from './components/RevisionToolbar/RevisionToolbar';
import RevisionAccordion from './components/RevisionAccordion';
import SuccessMessage from '../../../../../Layout/SuccessMessage';

const RevisionTable = ({
  revision: { revisions, loading },
  layout: { preferredTheme },
  clearRevisions,
}) => {
  const [successMessage, setSuccessMessage] = useState(false);
  let history = useHistory();
  const theme = preferredTheme === 'light' ? lightTheme : darkTheme;

  let data = revisions;

  const columns = [
    {
      name: '_id',
      options: {
        display: false,
      },
    },
    {
      name: 'note',
      options: {
        display: false,
      },
    },
    {
      name: 'documentLocation',
      options: {
        display: false,
      },
    },
    {
      name: 'name',
      label: 'Revision',
    },
    {
      name: 'revcode',
      label: 'Rev Code',
    },
    {
      name: 'scans',
      label: 'Scans',
    },
    {
      name: 'createdAt',
      label: 'Created',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let timestamp = new Date(value);
          return (
            timestamp.toDateString() + ' ' + timestamp.toLocaleTimeString()
          );
        },
      },
    },
    {
      name: 'latest',
      label: 'Status',
      options: {
        customBodyRender: (value) => {
          if (value) {
            return <CheckIcon style={{ color: 'green' }} />;
          }
          return <CloseIcon style={{ color: 'red' }} />;
        },
      },
    },
  ];

  const options = {
    print: false,
    selectableRows: 'none',
    download: false,
    filter: false,
    search: false,
    viewColumns: false,
    responsive: 'simple',
    textLabels: {
      body: {
        noMatch: 'No revisions created',
      },
    },
    customToolbar: () => {
      return <RevisionToolbar />;
    },
    expandableRows: true,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <RevisionAccordion
          selectedRevision={rowData}
          handleSuccess={setSuccessMessage}
        />
      );
    },
  };

  const goBack = () => {
    clearRevisions();
    history.push('/');
  };

  return (
    <div className='row'>
      <Loading loading={loading} />

      {!loading && (
        <MuiThemeProvider theme={theme}>
          <MUIDataTable
            title={<TitleBar backFunction={goBack} />}
            data={data}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      )}

      {successMessage && (
        <SuccessMessage
          message={successMessage}
          clearMessage={() => setSuccessMessage('')}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  document: state.document,
  revision: state.revision,
  layout: state.layout,
});

export default connect(mapStateToProps, { clearRevisions })(RevisionTable);
