import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@material-ui/core';

import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import Status from './status/status';
import LoadingBar from '../../components/loading-bar/loading-bar';
import Certificate from './certificate/certificate';
import { useCommonStyles } from '../common.styles';
import { getAllCertificates } from './operations/certificate.queries';
import { config } from '../../configs';
import { setItemsCount } from '../../redux/table/table.actions';

const { routes } = config;
const pathToCreateCertificatesPage = routes.pathToCreateCertificates;
const pageTitle = config.titles.certificatesPageTitles.mainPageTitle;
const tableTitles = config.tableHeadRowTitles.certificates;
const { CREATE_CERTIFICATE_TITLE } = config.buttonTitles;
const { ACTIVE_STATUS, USED_STATUS, EXPIRED_STATUS, PENDING_STATUS } =
  config.statuses;
const { NO_CERTIFICATES_MESSAGE } = config.messages;
const transformDate = (date) => {
  const exactDate = new Date(date);
  return exactDate.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

const checkStatus = (active, used, expired) => {
  if (active) {
    return ACTIVE_STATUS;
  }
  if (used) {
    return USED_STATUS;
  }
  if (expired) {
    return EXPIRED_STATUS;
  }
  return PENDING_STATUS;
};

const CertificatesPage = () => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { currentPage, rowsPerPage, itemsCount } = useSelector(({ Table }) => ({
    currentPage: Table.pagination.currentPage,
    rowsPerPage: Table.pagination.rowsPerPage,
    itemsCount: Table.itemsCount
  }));

  const { loading: certificatesLoading, data: certificates } = useQuery(
    getAllCertificates,
    {
      variables: {
        limit: rowsPerPage,
        skip: currentPage
      },
      onCompleted: (data) => {
        dispatch(setItemsCount(data.getAllCertificates.count));
      }
    }
  );

  const certificatesList = certificates?.getAllCertificates || { items: [] };

  const setUser = (usersInitials) =>
    usersInitials !== null
      ? `${usersInitials[0].firstName} ${usersInitials[0].lastName}`
      : '';

  const editCertificate = () => {
    // TODO
  };

  const deleteCertificate = () => {
    // TODO
  };

  if (certificatesLoading) {
    return <LoadingBar />;
  }

  const certificateItems = certificatesList.items.map((certificate) => (
    <TableContainerRow
      key={certificate._id}
      number={certificate.name}
      admin={<Certificate name={setUser(certificate.admin)} />}
      price={`${certificate.value} грн`}
      status={
        <Status
          status={checkStatus(
            certificate.isActivated,
            certificate.isUsed,
            certificate.isExpired
          )}
        />
      }
      date={
        certificate.isUsed || certificate.isExpired
          ? '-'
          : `${transformDate(certificate.dateStart)} - ${transformDate(
              certificate.dateEnd
            )}`
      }
      deleteHandler={deleteCertificate}
      editHandler={editCertificate}
      showAvatar={false}
    />
  ));

  return (
    <>
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
        {certificateItems.length ? (
          <TableContainerGenerator
            data-cy='certificateTable'
            pagination
            count={itemsCount}
            tableTitles={tableTitles}
            tableItems={certificateItems}
          />
        ) : (
          <Typography paragraph className={commonStyles.noRecords}>
            {NO_CERTIFICATES_MESSAGE}
          </Typography>
        )}
      </div>
    </>
  );
};

export default CertificatesPage;
