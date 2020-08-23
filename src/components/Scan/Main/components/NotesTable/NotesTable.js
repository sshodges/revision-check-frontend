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

const currentColour =
  localStorage.preferredTheme === 'dark' ? '#579156' : '#C8E1D3';

function createData(revision, note, _id) {
  return { revision, note, _id };
}

export default function NotesTable({ data, currentRev }) {
  const classes = useStyles();
  let rows = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      rows.push(createData(data[i].name, data[i].note, data[i]._id));
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
            {rows.map((row) => {
              const color =
                row._id === currentRev._id ? currentColour : 'inherit';
              const identifier = row._id === currentRev._id ? '*' : '';

              console.log(color);
              console.log(row);
              console.log(currentRev);
              return (
                <TableRow key={row.revision} style={{ backgroundColor: color }}>
                  <TableCell
                    className={classes.cell}
                    component='th'
                    scope='row'
                    align='center'
                  >
                    {row.revision + identifier}
                  </TableCell>
                  <TableCell className={classes.cell} align='right'>
                    {row.note}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>* Revision scanned</Typography>
    </div>
  );
}
