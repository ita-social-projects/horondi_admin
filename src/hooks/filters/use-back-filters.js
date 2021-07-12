import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setFilter } from '../../redux/back/back.actions';
import { setCurrentPage } from '../../redux/table/table.actions';

const useBackFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ Back }) => Back.filters);

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };

  const setSearchFilter = (searchString) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        search: searchString
      })
    );
  };

  return {
    searchOptions: {
      search: filters.search,
      setSearchFilter
    },
    clearOptions: {
      filters,
      search: filters.search,
      clearAllFilters
    }
  };
};

export default useBackFilters;
