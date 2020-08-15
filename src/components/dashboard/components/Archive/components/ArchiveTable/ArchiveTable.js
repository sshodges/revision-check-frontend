import React, { useState } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
// Styles
import { lightTheme, darkTheme } from './ArchiveTable-styles';
// Actions
import { changeParent, selectDocument } from 'actions/documentActions';
// Material UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import ArchiveIcon from '@material-ui/icons/Archive';
// Internal Components
import Loading from '../../../../../Layout/Loading';
import SuccessMessage from 'components/Dashboard/components/layout/SuccessMessage';
import ArchiveSelectToolbar from './components/ArchiveSelectToolbar/ArchiveSelectToolbar';

const ArchiveTable = ({
  document: { archives, loading },
  layout: { preferredTheme },
}) => {
  const [successMessage, setSuccessMessage] = useState(false);
  const theme = preferredTheme === 'light' ? lightTheme : darkTheme;

  let data = archives;

  const columns = [
    {
      name: '_id',
      options: {
        display: false,
      },
    },
    {
      name: 'type',
      options: {
        display: false,
      },
    },
    {
      name: 'parent',
      options: {
        display: false,
      },
    },
    {
      name: 'type',
      label: ' ',
      options: {
        sort: false,
        customBodyRender: (value) => {
          return <ArchiveIcon style={{ color: '#DE5145' }} />;
        },
      },
    },
    {
      name: 'name',
      label: 'Name',
    },
  ];

  const options = {
    filterType: 'checkbox',
    print: false,
    download: false,
    filter: false,
    viewColumns: false,
    responsive: 'scrollFullHeight',
    selectableRows: 'single',
    textLabels: {
      body: {
        noMatch: 'No items in archive',
      },
    },
    customToolbarSelect: (row, displayData, setSelectedRows) => (
      <ArchiveSelectToolbar
        rowData={displayData[row.data[0].index].data}
        handleSuccess={setSuccessMessage}
        setSelectedRows={setSelectedRows}
      />
    ),
  };

  return (
    <div className='row'>
      <Loading loading={loading} />

      {!loading && (
        <MuiThemeProvider theme={theme}>
          <MUIDataTable
            title={'Archived Documents'}
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
  layout: state.layout,
});

export default connect(mapStateToProps, {
  changeParent,
  selectDocument,
})(ArchiveTable);
