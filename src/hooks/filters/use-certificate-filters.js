import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCurrentPage } from '../../redux/table/table.actions';
import filterLabels from '../../configs/filter-labels';
import buttonTitles from '../../configs/button-titles';
import { statusCertificateFilterObject } from '../../utils/certificate';
import { certificateStatusTableAction } from '../../consts/certificate-status';

const useCertificateFilters = () => {
  const [sortLabel, setSortLabel] = useState('');
  const [search, setSearch] = useState('');
  const [sortDirection, setSortDirection] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [status, setStatus] = useState([]);

  const dispatch = useDispatch();

  const setSorting = ({ key, type, value }) => {
    dispatch(setCurrentPage(0));
    setSortDirection(type);
    setSortLabel(value);
    setSortBy(key);
  };

  const setSearchFilter = (str) => {
    dispatch(setCurrentPage(0));
    setSearch(str);
  };

  const clearCertificateFilter = () => {
    setSearch('');
    setSortDirection(null);
    setSortLabel('');
    setStatus([]);
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    clearCertificateFilter();
  };

  const setStatusFilter = (status) => {
    dispatch(setCurrentPage(0));
    setStatus(status);
  };

  return {
    filterByMultipleOptions: [
      {
        filters: status,
        label: buttonTitles.STATUS,
        selectItems: statusCertificateFilterObject,
        setFilterHandler: setStatusFilter,
        objForTranslateRenderItems: certificateStatusTableAction,
        status
      }
    ],
    searchOptions: {
      search,
      setSearchFilter
    },
    clearOptions: {
      clearAllFilters
    },
    sortOptions: {
      labels: filterLabels.certificates.sortLabels,
      setSorting,
      sortLabel,
      sortDirection,
      sortBy
    }
  };
};

export default useCertificateFilters;
