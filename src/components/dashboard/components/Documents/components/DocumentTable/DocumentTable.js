import React from 'react';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
// Styles
import { useStyles,customTheme } from './DocumentTable-styles'
// Actions
import {
  changeParent
} from 'actions/documentActions';
// Images
import DocumentIcon from 'assets/img/document.png';
import FolderIcon from 'assets/img/folder.png';
// Material UI
import Breadcrumb from './components/Breadcrumb';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { MuiThemeProvider } from '@material-ui/core/styles';

const DocumentTable = ({
  document: { documents, current },
  changeParent
}) => {
  const classes = useStyles();

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
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    onRowClick: function(rowData) {
      if (rowData[1] === 'folder'){
        changeParent(rowData[0]);
        return;
      }
      // Select document
      // Redirect to revisions
    },
    customToolbar: () => {
      return (
        <Tooltip title={"custom icon"}>
          <IconButton  >
            <AddIcon/>
          </IconButton>
        </Tooltip>)
    }
  };

  let data = documents.filter(item => (item.parent === current));

  return (
    <div className='row'>
      <MuiThemeProvider theme={customTheme}>
        <MUIDataTable
          title={
            <Breadcrumb />
          }
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, {
  changeParent
})(DocumentTable);
