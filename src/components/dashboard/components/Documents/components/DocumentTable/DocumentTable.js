import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
// Styles
import { customTheme } from './DocumentTable-styles';
// Actions
import { changeParent, selectDocument } from 'actions/documentActions';
// Material UI
import Breadcrumb from './components/Breadcrumb';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FolderIcon from '@material-ui/icons/Folder';
// Internal Components
import Toolbar from './components/Toolbar';
import Loading from '../../../layout/Loading';
import SelectToolbar from './components/SelectToolbar';
import SuccessMessage from 'components/Dashboard/components/layout/SuccessMessage';

const DocumentTable = ({
  document: { documents, current, loading, selectedDocument },
  changeParent,
  selectDocument,
}) => {
  let history = useHistory();

  const [addFolderModal, setAddFolderModal] = useState(false);
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  let data;
  if (searching) {
    data = documents;
  } else {
    data = documents.filter((item) => item.parent === current);
  }

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
          if (value === 'document') {
            return <AssignmentIcon style={{ color: '#DE5145' }} />;
          }
          return <FolderIcon style={{ color: '#1793C2' }} />;
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
        noMatch: 'No items in folder',
      },
    },
    onSearchChange: (searchQuery, currentRow, columns) => {
      if (searchQuery) {
        setSearching(true);
        setSearchText(searchQuery);
        return;
      }

      setSearching(false);
      setSearchText('');
    },
    searchText,
    onRowClick: (rowData) => {
      // Dirty hack to close search when clicking row, not native to MUI Datables
      // TODO: find cleaner solution
      const clearButton = document.querySelectorAll(
        '[class*=MUIDataTableSearch-clearIcon-]'
      )[0];
      if (clearButton) {
        clearButton.click();
      }

      if (rowData[1] === 'folder') {
        changeParent(rowData[0]);
        return;
      }

      let selectedDoc = documents.filter((doc) => doc._id === rowData[0])[0];

      selectDocument(selectedDoc);

      history.push('/document');
    },
    customToolbar: () => {
      return (
        <Toolbar
          addFolder={addFolderModal}
          setAddFolder={setAddFolderModal}
          addDocument={addDocumentModal}
          setAddDocument={setAddDocumentModal}
        />
      );
    },
    customToolbarSelect: (row, displayData, setSelectedRows) => (
      <SelectToolbar
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
        <MuiThemeProvider theme={customTheme}>
          <MUIDataTable
            title={<Breadcrumb />}
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
});

export default connect(mapStateToProps, {
  changeParent,
  selectDocument,
})(DocumentTable);
