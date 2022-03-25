import React, { useEffect } from 'react';
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
import { getUsers } from '../../redux/users/users.actions';
import { config } from '../../configs';

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
  const { loading: certificatesLoading, data: certificates } =
    useQuery(getAllCertificates);
  const certificatesList = certificates?.getAllCertificates || { items: [] };

  useEffect(() => {
    dispatch(getUsers({}));
  }, []);

  const { list: usersList, loading: usersLoading } = useSelector(
    ({ Users }) => ({
      list: Users.list,
      loading: Users.userLoading
    })
  );

  const setUser = (createdBy) => {
    if (createdBy && usersList.length) {
      for (const user of usersList) {
        if (user._id === createdBy._id) {
          return `${user.firstName} ${user.lastName}`;
        }
      }
    } else return '';
  };

  const editCertificate = () => {
    // TODO
  };

  const deleteCertificate = () => {
    // TODO
  };

  if (certificatesLoading && usersLoading) {
    return <LoadingBar />;
  }

  const certificateItems = certificatesList.items.map((certificate) => (
    <TableContainerRow
      key={certificate._id}
      number={certificate.name}
      createdBy={<Certificate name={setUser(certificate.createdBy)} />}
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
