import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@material-ui/core';

import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import Status from './status/status';
import LoadingBar from '../../components/loading-bar/loading-bar';
import Certificate from './certificate/certificate';
import { useCommonStyles } from '../common.styles';
import { getAllCertificates } from './operations/certificate.queries';
import {
  deleteCertificateById,
  updateCertificateByName
} from './operations/certificate.mutation';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { config } from '../../configs';
import { setItemsCount } from '../../redux/table/table.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';

const { routes } = config;
const pathToCreateCertificatesPage = routes.pathToCreateCertificates;
const pageTitle = config.titles.certificatesPageTitles.mainPageTitle;
const DELETE_CERTIFICATE_TITLE =
  config.titles.certificatesPageTitles.deleteCertificateTitle;
const UPDATE_CERTIFICATE_TITLE =
  config.titles.certificatesPageTitles.updateCertificateTitle;
const tableTitles = config.tableHeadRowTitles.certificates;
const { CREATE_CERTIFICATE_TITLE } = config.buttonTitles;
const { ACTIVE_STATUS, USED_STATUS, EXPIRED_STATUS, PENDING_STATUS } =
  config.statuses;
const {
  NO_CERTIFICATES_MESSAGE,
  DELETE_CERTIFICATE_MESSAGE,
  UPDATE_CERTIFICATE_MESSAGE
} = config.messages;

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

  const {
    loading: certificatesLoading,
    data: certificates,
    refetch: certificatesRefetch
  } = useQuery(getAllCertificates, {
    variables: {
      limit: rowsPerPage,
      skip: currentPage
    },
    onCompleted: (data) => {
      dispatch(setItemsCount(data.getAllCertificates.count));
    }
  });
  const [deleteCertificate] = useMutation(deleteCertificateById);
  const [updateCertificate] = useMutation(updateCertificateByName);
  const certificatesList = certificates?.getAllCertificates || { items: [] };
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const setUser = (usersInitials) =>
    usersInitials.length !== 0
      ? `${usersInitials[0].firstName} ${usersInitials[0].lastName}`
      : '';

  const updateCertificateHandler = async (name) => {
    await updateCertificate({
      variables: {
        name
      }
    });
    await certificatesRefetch();
    dispatch(closeDialog());
  };

  const openUpdateModal = (name) => {
    openSuccessSnackbar(
      () => updateCertificateHandler(name),
      UPDATE_CERTIFICATE_MESSAGE,
      UPDATE_CERTIFICATE_TITLE
    );
  };

  const deleteCertificateHandler = async (id) => {
    await deleteCertificate({
      variables: {
        id
      }
    });
    await certificatesRefetch();
    dispatch(closeDialog());
  };

  const openDeleteModal = (id) => {
    openSuccessSnackbar(
      () => deleteCertificateHandler(id),
      DELETE_CERTIFICATE_MESSAGE,
      DELETE_CERTIFICATE_TITLE
    );
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
      deleteHandler={() => {
        !certificate.isActivated && openDeleteModal(certificate._id);
      }}
      editHandler={() => {
        certificate.isActivated && openUpdateModal(certificate.name);
      }}
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
