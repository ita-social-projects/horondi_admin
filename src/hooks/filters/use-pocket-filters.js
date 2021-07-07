import { useDispatch, useSelector } from 'react-redux';

import { clearFilters, setFilter } from '../../redux/pockets/pockets.actions';
import { setCurrentPage } from '../../redux/table/table.actions';

const usePocketFilters = () => {
  const dispatch = useDispatch();
  const filter = useSelector(({ Pockets }) => Pockets.filter);

  const setSearchFilter = (searchString) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        search: searchString
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };
  return {
    searchOptions: {
      search: filter.search,
      setSearchFilter
    },
    clearOptions: {
      filter,
      search: filter.search,
      clearAllFilters
    }
  };
};

export default usePocketFilters;
