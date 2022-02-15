import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Typography } from '@material-ui/core';

import Filter from './filters/filters';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import Status from './status/status';
import LoadingBar from '../../components/loading-bar/loading-bar';
import Certificate from './certificate/certificate';

import { useCommonStyles } from '../common.styles';

import { inputName } from '../../utils/order';
import { getUsers } from '../../redux/users/users.actions';
import { getCertificatesList } from '../../redux/certificates/certificates.actions';

import { config } from '../../configs';

const { routes } = config;
const pageTitle = config.titles.certificatesPageTitles.mainPageTitle;
const tableTitles = config.tableHeadRowTitles.certificates;
const { CREATE_CERTIFICATE_TITLE } = config.buttonTitles;
const { NO_CERTIFICATE_MESSAGE } = config.messages;
const { ACTIVE_STATUS, USED_STATUS, EXPIRED_STATUS } = config.statuses;
const pathToCreateCertificatesPage = routes.pathToCreateCertificates;

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
    return ACTIVE_STATUS;
  } if (used) {
    return USED_STATUS;
  } return EXPIRED_STATUS;
};

const CertificatesPage = () => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();

  const { items: certificatesList, certificatesLoading } = useSelector(
    ({ Certificates }) => ({
      items: Certificates.list,
      certificatesLoading: Certificates.certificatesLoading
    })
  );

  const { list: usersList, loading: usersLoading } = useSelector(
    ({ Users }) => ({
      list: Users.list,
      loading: Users.userLoading
    })
  );

  useEffect(() => {
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    dispatch(getCertificatesList());
  }, [dispatch]);

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

  const certificateItems = certificatesList.items.map((certificate) => (
    <TableContainerRow
      key={certificate._id}
      number={certificate.name}
      createdBy={
        <Certificate
          name={setUser(certificate.createdBy._id)}
          value={certificate.value}
        />
      }
      price={`${certificate.value} грн`}
      status={
        <Status
          status={checkStatus(certificate.isActivated, certificate.isUsed)}
        />
      }
      date={
        certificate.isActivated
          ? `${transformDate(certificate.dateStart)} - ${transformDate(
              certificate.dateEnd
            )}`
          : '-'
      }
      deleteHandler
      editHandler
      showAvatar={false}
    />
  ));

  const pageContent = certificateItems.length ? (
    <TableContainerGenerator
      data-cy='certificateTable'
      tableTitles={tableTitles}
      tableItems={certificateItems}
    />
  ) : (
    <p className={commonStyles.noRecords}>{NO_CERTIFICATE_MESSAGE}</p>
  );

  return (
    <>
      {certificatesLoading || usersLoading ? (
        <LoadingBar />
      ) : (
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
          {pageContent}
        </div>
      )}
    </>
  );
};

export default CertificatesPage;
