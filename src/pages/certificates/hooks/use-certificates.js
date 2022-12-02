import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { getAllCertificates } from '../operations/certificate.queries';
import { setItemsCount } from '../../../redux/table/table.actions';
import {
  deleteCertificateById,
  updateCertificateStatus
} from '../operations/certificate.mutation';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../../redux/snackbar/snackbar.actions';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import { config } from '../../../configs';
import { statusCertificates } from '../../../consts/certificate-status';
import useCertificateFilters from '../../../hooks/filters/use-certificate-filters';
import { certificateErrorMessages } from '../../../configs/error-modal-messages';

const DELETE_CERTIFICATE_TITLE =
  config.titles.certificatesPageTitles.deleteCertificateTitle;
const UPDATE_CERTIFICATE_TITLE =
  config.titles.certificatesPageTitles.updateCertificateTitle;
const { SUCCESS_UPDATE_STATUS, SUCCESS_DELETE_STATUS } = config.statuses;
const { DELETE_CERTIFICATE_MESSAGE, UPDATE_CERTIFICATE_MESSAGE } =
  config.messages;
const { ERROR_BOUNDARY_STATUS } = config.errorStatuses;

const transformDate = (date) => {
  const exactDate = new Date(date);
  return exactDate.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

const checkStatus = (certificate) => {
  let certificateStatus = null;

  statusCertificates.forEach((status) => {
    if (certificate[status.value]) {
      certificateStatus = status.label;
    }
  });

  return certificateStatus;
};

const setUser = (usersInitials) =>
  usersInitials.length
    ? `${usersInitials[0].firstName} ${usersInitials[0].lastName}`
    : '';

const useCertificates = () => {
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const [deleteCertificate] = useMutation(deleteCertificateById);
  const [updateCertificate] = useMutation(updateCertificateStatus);
  const certificatesFilters = useCertificateFilters();
  const { sortOptions, searchOptions, filterByMultipleOptions } =
    certificatesFilters;

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
      skip: currentPage * rowsPerPage,
      sortOrder: sortOptions.sortDirection,
      sortBy: sortOptions.sortBy,
      search: searchOptions.search,
      status: filterByMultipleOptions[0].status
    },
    onCompleted: (data) => {
      dispatch(setItemsCount(data.getAllCertificates.count));
    },
    fetchPolicy: 'no-cache'
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

  const updateCertificateHandler = async (params, statusUpdate) => {
    try {
      const { data } = await updateCertificate({
        variables: {
          params,
          statusUpdate
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
      () => updateCertificateHandler({ name }, 'USED'),
      UPDATE_CERTIFICATE_MESSAGE,
      UPDATE_CERTIFICATE_TITLE
    );
  };

  const deleteCertificateHandler = async (id, adminId) => {
    try {
      const { data } = await deleteCertificate({
        variables: {
          id,
          adminId
        }
      });
      if (data.deleteCertificate.statusCode) {
        throw new Error(data.deleteCertificate.message);
      }
      await certificatesRefetch();
      successSnackbarHandler(SUCCESS_DELETE_STATUS);
    } catch (e) {
      errorSnackbarHandler(
        certificateErrorMessages[e.message] || ERROR_BOUNDARY_STATUS
      );
    } finally {
      dispatch(closeDialog());
    }
  };

  const openDeleteModal = (id, adminId) => {
    openSuccessSnackbar(
      () => deleteCertificateHandler(id, adminId),
      DELETE_CERTIFICATE_MESSAGE,
      DELETE_CERTIFICATE_TITLE
    );
  };

  return {
    loading: certificatesLoading,
    items: certificatesList.items,
    count: itemsCount,
    certificatesFilters,
    transformDate,
    checkStatus,
    setUser,
    openUpdateModal,
    openDeleteModal,
    deleteCertificateHandler,
    updateCertificateHandler
  };
};

export default useCertificates;
