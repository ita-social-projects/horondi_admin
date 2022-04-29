import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

import TableContainerGenerator from '../../containers/table-container-generator';
import { config } from '../../configs';
import useCertificates from './hooks/use-certificates';
import { useCommonStyles } from '../common.styles';
import LoadingBar from '../../components/loading-bar';
import TableContainerRow from '../../containers/table-container-row';
import Certificate from './certificate/certificate';
import Status from './status/status';

const pathToCreateCertificatesPage = config.routes.pathToCreateCertificates;
const pageTitle = config.titles.certificatesPageTitles.mainPageTitle;
const tableTitles = config.tableHeadRowTitles.certificates;
const { CREATE_CERTIFICATE_TITLE } = config.buttonTitles;
const { NO_CERTIFICATES_MESSAGE } = config.messages;

const CertificatesPage = () => {
  const commonStyles = useCommonStyles();
  const certificates = useCertificates();

  const getDate = (item) => item.isUsed || item.isExpired
      ? '-'
      : `${certificates.transformDate(
          item.dateStart
        )} - ${certificates.transformDate(item.dateEnd)}`;

  const certificateItems = certificates.items.map((certificate) => (
    <TableContainerRow
      key={certificate._id}
      number={certificate.name}
      admin={<Certificate name={certificates.setUser(certificate.admin)} />}
      price={`${certificate.value} грн`}
      status={
        <Status
          status={certificates.checkStatus(
            certificate.isActivated,
            certificate.isUsed,
            certificate.isExpired
          )}
        />
      }
      date={getDate(certificate)}
      deleteHandler={() => {
        certificates.openDeleteModal(certificate._id);
      }}
      editHandler={() => {
        certificates.openUpdateModal(certificate.name);
      }}
      showAvatar={false}
    />
  ));

  if (certificates.loading) {
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
        {certificateItems.length ? (
          <TableContainerGenerator
            data-cy='certificateTable'
            pagination
            count={certificates.count}
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
