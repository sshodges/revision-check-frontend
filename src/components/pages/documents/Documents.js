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
  getAllFolders
} from '../../../actions/documentActions';
// Images
import DocumentIcon from '../../../assets/img/document.png';
import FolderIcon from '../../../assets/img/folder.png';

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
  document: { documents, folders, parent },
  getAllDocuments,
  getAllFolders
}) => {
  const classes = useStyles();

  const columns = [
    {
      name: 'status',
      label: ' ',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value) {
            return <img src={DocumentIcon} className={classes.icon} />;
          }
          return <img src={FolderIcon} className={classes.icon} />;
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
    getAllFolders();
  }, [getAllDocuments, getAllFolders]);

  const options = {
    filterType: 'checkbox',
    print: false,
    download: false,
    filter: false,
    viewColumns: false,
    responsive: 'scrollMaxHeight',
    selectableRows: 'none'
  };

  let data = folders.concat(documents).filter(item => item.parent === parent);

  return (
    <div className='row'>
      <MuiThemeProvider theme={customTheme}>
        <MUIDataTable
          title={'Folders'}
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

export default connect(mapStateToProps, { getAllDocuments, getAllFolders })(
  Documents
);
