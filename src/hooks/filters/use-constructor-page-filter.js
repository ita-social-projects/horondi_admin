import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/table/table.actions';
import { patternPlaceholderSearch } from '../../consts/pattern-status';

const useConstructorPageFilter = (
  itemKey,
  setFilterAction,
  clearFilterAction
) => {
  const dispatch = useDispatch();

  const constructorItemKey = `${itemKey[0].toUpperCase()}${itemKey.slice(1)}s`;
  const store = useSelector((store) => store);
  const { filter } = store[constructorItemKey];

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilterAction());
  };

  const setSearchFilter = (name) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterAction({
        name
      })
    );
  };

  return {
    searchOptions: {
      placeholderText: patternPlaceholderSearch,
      search: filter?.name,
      setSearchFilter
    },
    clearOptions: {
      filter,
      clearAllFilters
    }
  };
};

export default useConstructorPageFilter;
