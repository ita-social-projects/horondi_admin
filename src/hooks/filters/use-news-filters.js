import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/table/table.actions';
import { clearNewsFilter, setNewsFilter } from '../../redux/news/news.actions';

const useNewsFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ News }) => News.filters);

  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setNewsFilter({
        search
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearNewsFilter());
  };
  return {
    searchOptions: {
      search: filters.search,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useNewsFilters;
