import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setFilter } from '../../redux/comments/comments.actions';
import { setCurrentPage } from '../../redux/table/table.actions';

const useCommentFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ Comments }) => Comments.filters);

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
      filters,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useCommentFilters;
