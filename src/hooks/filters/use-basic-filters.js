import { useDispatch, useSelector } from 'react-redux';

import { clearFilters, setFilter } from '../../redux/basics/basics.actions';
import { setCurrentPage } from '../../redux/table/table.actions';

const useBasicFilters = () => {
  const dispatch = useDispatch();
  const filter = useSelector(({ Basics }) => Basics.filter);

  const setSearchFilter = (name) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        name
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };
  return {
    searchOptions: {
      search: filter?.name,
      setSearchFilter
    },
    clearOptions: {
      filter,
      clearAllFilters
    }
  };
};

export default useBasicFilters;
