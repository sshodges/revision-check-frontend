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

      selectDocument({
        _id: rowData[0],
        name: rowData[4],
      });

      history.push('/revisions');
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
    customToolbarSelect: (row, displayData) => (
      <SelectToolbar rowData={displayData[row.data[0].index].data} />
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
