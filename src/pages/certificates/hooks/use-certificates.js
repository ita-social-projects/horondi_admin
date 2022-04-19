import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { getAllCertificates } from '../operations/certificate.queries';
import { setItemsCount } from '../../../redux/table/table.actions';
import {
  deleteCertificateById,
  updateCertificateByName
} from '../operations/certificate.mutation';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../../redux/snackbar/snackbar.actions';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import TableContainerRow from '../../../containers/table-container-row';
import Certificate from '../certificate/certificate';
import Status from '../status/status';
import { config } from '../../../configs';

const DELETE_CERTIFICATE_TITLE =
  config.titles.certificatesPageTitles.deleteCertificateTitle;
const UPDATE_CERTIFICATE_TITLE =
  config.titles.certificatesPageTitles.updateCertificateTitle;
const {
  ACTIVE_STATUS,
  USED_STATUS,
  EXPIRED_STATUS,
  PENDING_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_DELETE_STATUS
} = config.statuses;
const { DELETE_CERTIFICATE_MESSAGE, UPDATE_CERTIFICATE_MESSAGE } =
  config.messages;

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

const useCertificates = () => {
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const [deleteCertificate] = useMutation(deleteCertificateById);
  const [updateCertificate] = useMutation(updateCertificateByName);

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

  const certificatesList = certificates?.getAllCertificates || { items: [] };

  const successSnackbarHandler = (message) => {
    dispatch(setSnackBarSeverity('success'));
    dispatch(setSnackBarMessage(message));
    dispatch(setSnackBarStatus(true));
  };

  const errorSnackbarHandler = (message) => {
    dispatch(setSnackBarSeverity('error'));
    dispatch(setSnackBarMessage(message));
    dispatch(setSnackBarStatus(true));
  };

  const updateCertificateHandler = async (name) => {
    try {
      const { data } = await updateCertificate({
        variables: {
          name
        }
      });
      if (data.updateCertificate.statusCode) {
        throw new Error(data.updateCertificate.message);
      }
      await certificatesRefetch();
      successSnackbarHandler(SUCCESS_UPDATE_STATUS);
    } catch (e) {
      errorSnackbarHandler(e.message);
    } finally {
      dispatch(closeDialog());
    }
  };

  const openUpdateModal = (name) => {
    openSuccessSnackbar(
      () => updateCertificateHandler(name),
      UPDATE_CERTIFICATE_MESSAGE,
      UPDATE_CERTIFICATE_TITLE
    );
  };

  const deleteCertificateHandler = async (id) => {
    try {
      const { data } = await deleteCertificate({
        variables: {
          id
        }
      });
      if (data.deleteCertificate.statusCode) {
        throw new Error(data.deleteCertificate.message);
      }
      await certificatesRefetch();
      successSnackbarHandler(SUCCESS_DELETE_STATUS);
    } catch (e) {
      errorSnackbarHandler(e.message);
    } finally {
      dispatch(closeDialog());
    }
  };

  const openDeleteModal = (id) => {
    openSuccessSnackbar(
      () => deleteCertificateHandler(id),
      DELETE_CERTIFICATE_MESSAGE,
      DELETE_CERTIFICATE_TITLE
    );
  };

  const setUser = (usersInitials) =>
    usersInitials.length
      ? `${usersInitials[0].firstName} ${usersInitials[0].lastName}`
      : '';

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
        openDeleteModal(certificate._id);
      }}
      editHandler={() => {
        openUpdateModal(certificate.name);
      }}
      showAvatar={false}
    />
  ));

  if (certificatesLoading) {
    return { loading: certificatesLoading };
  }

  return { items: certificateItems, count: itemsCount };
};

export default useCertificates;
