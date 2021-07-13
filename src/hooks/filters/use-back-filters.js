import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setFilter } from '../../redux/back/back.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import { patternPlaceholderSearch } from '../../consts/pattern-status';

const useBackFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ Back }) => Back.filters);

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };

  const setSearchFilter = (name) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        name
      })
    );
  };

  return {
    searchOptions: {
      placeholderText: patternPlaceholderSearch,
      search: filters?.name,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useBackFilters;
