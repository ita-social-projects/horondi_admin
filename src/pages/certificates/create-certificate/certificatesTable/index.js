import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { useStyles } from '../create-certificate.styles';

function CertificatesTable({ certificates }) {
  const styles = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.cellHead}>Номер</TableCell>
            <TableCell className={styles.cellHead} align='left'>
              Вартість
            </TableCell>
            <TableCell className={styles.cellHead} align='left'>
              Термін дії
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificates.map((row) => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell align='left'>{row.name}</TableCell>
              <TableCell align='left'>{row.expired}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CertificatesTable.propTypes = {
  certificates: PropTypes.arrayOf({
    id: PropTypes.string,
    name: PropTypes.string,
    expired: PropTypes.string
  })
};

CertificatesTable.defaultProps = {
  certificates: []
};

export default CertificatesTable;
