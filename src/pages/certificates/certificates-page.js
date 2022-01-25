import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { config } from '../../configs';
import Filter from './filters/filters';
import { useCommonStyles } from '../common.styles';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import Status from './status/status';
import {
  deleteCertificate,
  getCertificateList
} from '../../redux/certificates/certificates.actions';

import Certificate from './certificate/certificate';
import { inputName } from '../../utils/order';
import { getUsers } from '../../redux/users/users.actions';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { deleteOrder } from '../../redux/orders/orders.actions';

const map = require('lodash/map');

const { routes } = config;
const pathToCreateCertificatesPage = routes.pathToCreateCertificates;
const pageTitle = config.titles.certificatesPageTitles.mainPageTitle;
const tableTitles = config.tableHeadRowTitles.certificates;
const { CREATE_CERTIFICATE_TITLE } = config.buttonTitles;
const { NO_CERTIFICATE_MESSAGE } = config.messages;
const { REMOVE_CERTIFICATE_MESSAGE } = config.messages;

const transformDate = (date) => {
  const exactDate = new Date(date);
  return exactDate.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

const checkStatus = (active, used) => {
  if (active) {
    return 'Активний';
  }
  if (used) {
    return 'Використаний';
  }
  if (!active && !used) {
    return 'Прострочений';
  }
};

const CertificatesPage = () => {
  const commonStyles = useCommonStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const dispatch = useDispatch();
  const { items: certificatesList } = useSelector(
    ({ Certificates }) => Certificates.list
  );
  const usersList = useSelector(({ Users }) => Users.list);
  const { currentPage, rowsPerPage, itemsCount } = useSelector(({ Table }) => ({
    currentPage: Table.pagination.currentPage,
    rowsPerPage: Table.pagination.rowsPerPage,
    itemsCount: Table.itemsCount
  }));

  const deleteCertificateHandler = (id) => {
    const removeCertificate = () => {
      dispatch(closeDialog());
      dispatch(deleteCertificate(id));
    };
    openSuccessSnackbar(removeCertificate, REMOVE_CERTIFICATE_MESSAGE);
  };

  useEffect(() => {
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    dispatch(
      getCertificateList({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  const setUser = (id) => {
    if (id && usersList) {
      for (const user of usersList) {
        if (user._id === id) {
          return `${user?.firstName} ${user?.lastName}`;
        }
      }
    } else {
      return inputName.noUser;
    }
  };

  const certificateItems = map(certificatesList, (certificate) => (
    <TableContainerRow
      key={certificate._id}
      number={certificate.name}
      createdBy={
        <Certificate
          name={setUser(certificate.createdBy)}
          value={certificate.value}
        />
      }
      price={`${certificate.value} грн`}
      status={
        <Status
          status={checkStatus(certificate.isActive, certificate.isUsed)}
        />
      }
      date={
        certificate.isActive
          ? `${transformDate(certificate.dateStart)} - ${transformDate(
              certificate.dateEnd
            )}`
          : '-'
      }
      deleteHandler={() => deleteCertificateHandler(certificate._id)}
      editHandler={() => {}}
      showAvatar={false}
    />
  ));

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {pageTitle}
        </Typography>
        <Button
          data-cy='add-certificate'
          component={Link}
          to={pathToCreateCertificatesPage}
          variant='contained'
          color='primary'
        >
          {CREATE_CERTIFICATE_TITLE}
        </Button>
      </div>
      <div>
        <Filter />
      </div>
      {certificateItems.length ? (
        <TableContainerGenerator
          data-cy='certificateTable'
          pagination
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={certificateItems}
        />
      ) : (
        <p className={commonStyles.noRecords}>{NO_CERTIFICATE_MESSAGE}</p>
      )}
    </div>
  );
};

export default CertificatesPage;
