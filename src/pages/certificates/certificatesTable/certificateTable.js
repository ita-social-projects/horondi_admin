import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useStyles } from '../create-certificate/create-certificate.styles';

export const CertificatesTable = ({ certificates }) => {
  const styles = useStyles();

  const formatDate = (date, newDate) =>
    `${moment(date).format('DD/MM/YYYY')} - ${moment(newDate).format(
      'DD/MM/YYYY'
    )}`;

  const rowItems = ['Номер', 'Вартість', 'Термін дії'];
  const headerItems = rowItems.map((item) => (
    <TableCell key={item} className={styles.cellHead} align='left'>
      {item}
    </TableCell>
  ));

  const bodyItems = certificates.map((row) => (
    <TableRow key={row.id}>
      <TableCell component='th' scope='row'>
        {row.id}
      </TableCell>
      <TableCell align='left'>{row.name}</TableCell>
      <TableCell align='left'>{formatDate(row.dateFrom, row.dateTo)}</TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{headerItems}</TableRow>
        </TableHead>
        <TableBody>{bodyItems}</TableBody>
      </Table>
    </TableContainer>
  );
};

const certificateTableInterface = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  dateFrom: PropTypes.instanceOf(Date),
  dateTo: PropTypes.instanceOf(Date)
});

CertificatesTable.propTypes = {
  certificates: PropTypes.arrayOf(certificateTableInterface)
};

CertificatesTable.defaultProps = {
  certificates: []
};
