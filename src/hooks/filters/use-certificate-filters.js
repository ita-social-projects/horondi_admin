import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCurrentPage } from '../../redux/table/table.actions';
import filterLabels from '../../configs/filter-labels';

const useCertificateFilters = () => {
  const [sortLabel, setSortLabel] = useState('');
  const [search, setSearch] = useState('');
  const [sortDirection, setSortDirection] = useState(null);
  const [sortBy, setSortBy] = useState(null);

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
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    clearCertificateFilter();
  };

  return {
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
