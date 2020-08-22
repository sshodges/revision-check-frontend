import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  cell: {
    fontSize: 18,
    whiteSpace: 'pre-line',
  },
});

function createData(revision, note) {
  return { revision, note };
}

export default function NotesTable({ data }) {
  const classes = useStyles();
  let rows = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      rows.push(createData(data[i].name, data[i].note));
    }
  }

  return (
    <div>
      <Typography variant='h3' align='center' gutterBottom>
        Revision Notes
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='caption table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Revision</TableCell>
              <TableCell className={classes.cell} align='center'>
                Note
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.revision}>
                <TableCell
                  className={classes.cell}
                  component='th'
                  scope='row'
                  align='center'
                >
                  {row.revision}
                </TableCell>
                <TableCell className={classes.cell} align='right'>
                  {row.note}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
