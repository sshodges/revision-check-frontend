import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
// Styles
import { useStyles, customTheme } from './RevisionTable-styles';
// Actions

// Material UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// Internal Components
import Loading from '../../../layout/Loading';
import { BackButton } from './components/BackButton/BackButton';

const RevisionTable = ({
  document: { selectedDocument },
  revision: { revisions, loading }
}) => {
  let history = useHistory();
  let title = selectedDocument.name;
  let data = revisions;

  const columns = [
    {
      name: 'id',
      options: {
        display: false
      }
    },
    {
      name: 'name',
      label: 'Revision'
    },
    {
      name: 'uniqueCode',
      label: 'Rev Code'
    },
    {
      name: 'latest',
      label: 'Status',
      options: {
        customBodyRender: value => {
          if (value) {
            return <CheckIcon style={{ color: 'green' }} />;
          }
          return <CloseIcon style={{ color: 'red' }} />;
        }
      }
    }
  ];

  const options = {
    print: false,
    selectableRows: 'none',
    download: false,
    filter: false,
    search: false,
    viewColumns: false,
    responsive: 'scrollFullHeight',
    textLabels: {
      body: {
        noMatch: 'No revisions created'
      }
    },
    expandableRows: true,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>Custom expandable row option</TableCell>
        </TableRow>
      );
    },
    onRowsExpand: (curExpanded, allExpanded) =>
      console.log(curExpanded, allExpanded)
  };

  const goBack = () => {
    history.push('/');
  };

  return (
    <div className='row'>
      <Loading loading={loading} />

      {!loading && (
        <MuiThemeProvider theme={customTheme}>
          <MUIDataTable
            title={<BackButton backFunction={goBack} title={title} />}
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
  document: state.document,
  revision: state.revision
});

export default connect(mapStateToProps, {})(RevisionTable);
