import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
// Actions
import {
  getAllDocuments,
  getAllFolders,
  changeParent
} from '../../../actions/documentActions';
// Images
import DocumentIcon from '../../../assets/img/document.png';
import FolderIcon from '../../../assets/img/folder.png';
import Breadcrumb from './Breadcrumb';

const useStyles = makeStyles(theme => ({
  icon: {
    height: 20,
    width: 20,
    marginLeft: 15,
    display: 'inline',
    verticalAlign: 'middle'
  },
  text: {
    height: '100%',
    alignItems: 'center',
    display: 'inline',
    verticalAlign: 'middle'
  }
}));

const customTheme = createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        '&:nth-child(1)': {
          width: 20
        }
      }
    }
  }
});

const Documents = ({
  document: { documents, parent, current },
  getAllDocuments,
  getAllFolders,
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

  useEffect(() => {
    getAllDocuments();
    // getAllFolders();
  }, [getAllDocuments, getAllFolders]);

  const options = {
    filterType: 'checkbox',
    print: false,
    download: false,
    filter: false,
    viewColumns: false,
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    onRowClick: function(rowData) {
      changeParent(rowData[0]);
    }
  };

  let data = documents.filter(item => item.parent === current);

  let currentItem = documents.filter(item => item.id === current);
  currentItem =
    currentItem.length === 0 ? { name: 'Home', id: 0 } : currentItem[0];
  let previousItem = documents.filter(item => item.id === parent);
  previousItem =
    previousItem.length === 0
      ? { name: 'Home', id: 0, parent: 0 }
      : previousItem[0];

  return (
    <div className='row'>
      <MuiThemeProvider theme={customTheme}>
        <MUIDataTable
          title={
            <Breadcrumb
              current={currentItem}
              previous={previousItem}
              handleBack={changeParent}
            />
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
  getAllDocuments,
  getAllFolders,
  changeParent
})(Documents);
