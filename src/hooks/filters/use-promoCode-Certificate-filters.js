import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCurrentPage } from '../../redux/table/table.actions';

const usePromoCodeCertificateFilters = () => {
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

  const setStatusFilter = (statuses) => {
    dispatch(setCurrentPage(0));
    setStatus(statuses);
  };

  return {
    setSorting,
    setSearchFilter,
    clearCertificateFilter,
    clearAllFilters,
    setStatusFilter,
    sortLabel,
    search,
    sortDirection,
    sortBy,
    status
  };
};

export default usePromoCodeCertificateFilters;
