import React, { useState } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
// Styles
import { useStyles, customTheme } from './DocumentTable-styles';
// Actions
import { changeParent } from 'actions/documentActions';
// Images
import DocumentIcon from 'assets/img/document.png';
import FolderIcon from 'assets/img/folder.png';
// Material UI
import Breadcrumb from './components/Breadcrumb';
import { MuiThemeProvider } from '@material-ui/core/styles';
// Internal Components
import Toolbar from './components/Toolbar';
import Loading from '../../../layout/Loading';
import SelectToolbar from './components/SelectToolbar';

const DocumentTable = ({
  document: { documents, current, loading },
  changeParent
}) => {
  const classes = useStyles();

  const [addFolderModal, setAddFolderModal] = useState(false);
  const [addDocumentModal, setAddDocumentModal] = useState(false);

  const columns = [
    {
      name: 'id',
      options: {
        display: false
      }
    },
    {
      name: 'type',
      options: {
        display: false
      }
    },
    {
      name: 'parent',
      options: {
        display: false
      }
    },
    {
      name: 'type',
      label: ' ',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 'document') {
            return (
              <img
                src={DocumentIcon}
                className={classes.icon}
                alt='document icon'
              />
            );
          }
          return (
            <img src={FolderIcon} className={classes.icon} alt='folder icon' />
          );
        }
      }
    },
    {
      name: 'name',
      label: 'Name'
    }
  ];

  const options = {
    filterType: 'checkbox',
    print: false,
    download: false,
    filter: false,
    viewColumns: false,
    responsive: 'scrollFullHeight',
    selectableRows: 'single',
    onRowClick: function(rowData) {
      if (rowData[1] === 'folder') {
        changeParent(rowData[0]);
        return;
      }
      // Select document
      // Redirect to revisions
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
    )
  };

  let data = documents.filter(item => item.parent === current);

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

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, {
  changeParent
})(DocumentTable);
