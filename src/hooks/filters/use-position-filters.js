import { useDispatch, useSelector } from 'react-redux';

import { clearFilters, setFilter } from '../../redux/position/position.actions';
import { setCurrentPage } from '../../redux/table/table.actions';

const usePositionFilters = () => {
  const dispatch = useDispatch();
  const filter = useSelector(({ Positions }) => Positions.filter);

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

export default usePositionFilters;
