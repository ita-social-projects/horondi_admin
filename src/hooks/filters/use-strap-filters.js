import { useDispatch, useSelector } from 'react-redux';

import { clearFilters, setFilter } from '../../redux/straps/straps.actions';
import { setCurrentPage } from '../../redux/table/table.actions';

const useStrapFilters = () => {
  const dispatch = useDispatch();
  const filter = useSelector(({ Straps }) => Straps.filter);

  const setSearchFilter = (searchString) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        name: searchString
      })
    );
  };
  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };

  return {
    searchOptions: {
      search: filter.name,
      setSearchFilter,
      placeholderText: 'по назві'
    },
    clearOptions: {
      filter,
      search: filter.name,
      clearAllFilters
    }
  };
};

export default useStrapFilters;
