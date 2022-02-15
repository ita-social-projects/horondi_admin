import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Button, Typography } from '@material-ui/core';

import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import Status from './status/status';
import LoadingBar from '../../components/loading-bar/loading-bar';
import Certificate from './certificate/certificate';

import { useCommonStyles } from '../common.styles';

import { getAllCertificates } from './operations/certificate.queries';
import { getAllUsers } from '../users/operations/user.queries';

import { config } from '../../configs';

const { routes } = config;
const pageTitle = config.titles.certificatesPageTitles.mainPageTitle;
const tableTitles = config.tableHeadRowTitles.certificates;
const { CREATE_CERTIFICATE_TITLE } = config.buttonTitles;
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
  if (active && !used) {
    return ACTIVE_STATUS;
  } if (!active && used) {
    return USED_STATUS;
  } if (!active && !used) {
    return EXPIRED_STATUS;
  }
};

const CertificatesPage = () => {
  const commonStyles = useCommonStyles();
  const { loading: usersLoading, data: users } = useQuery(getAllUsers);
  const usersList = users?.getAllUsers || {};
  const { loading: certificatesLoading, data: certificates } =
    useQuery(getAllCertificates);
  const certificatesList = certificates?.getAllCertificates || {};

  const setUser = (id) => {
    for (const user of usersList.items) {
      if (user._id === id) {
        return `${user?.firstName} ${user?.lastName}`;
      }
    }
  };

  const certificateItems =
    certificatesList.items && usersList.items
      ? certificatesList.items.map((certificate) => (
          <TableContainerRow
            key={certificate._id}
            number={certificate.name}
            createdBy={
              <Certificate name={setUser(certificate.createdBy._id)} />
            }
            price={`${certificate.value} грн`}
            status={
              <Status
                status={checkStatus(
                  certificate.isActivated,
                  certificate.isUsed
                )}
              />
            }
            date={
              certificate.isActivated
                ? `${transformDate(certificate.dateStart)} - ${transformDate(
                    certificate.dateEnd
                  )}`
                : '-'
            }
            deleteHandler={() => null}
            editHandler={() => null}
            showAvatar={false}
          />
        ))
      : null;

  if (certificatesLoading && usersLoading) {
    return <LoadingBar />;
  }

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
        <TableContainerGenerator
          data-cy='certificateTable'
          tableTitles={tableTitles}
          tableItems={certificateItems}
        />
      </div>
    </>
  );
};

export default CertificatesPage;
