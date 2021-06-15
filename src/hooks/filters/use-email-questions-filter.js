import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilters,
  setFilter
} from '../../redux/email-questions/email-questions.actions';
import { setCurrentPage } from '../../redux/table/table.actions';

const useQuestionFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ EmailQuestions }) => EmailQuestions.filters);
  console.log('filters', filters);
  const setCommentDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        dateFrom: date[0],
        dateTo: date[1]
      })
    );
  };

  const setFiltersFilter = (filters) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        filters
      })
    );
  };
  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        search
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };

  return {
    filterByDateOptions: {
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      dateHandler: setCommentDateRangeFilter
    },
    filterByStatus: {
      filters: filters.filters,
      setFiltersFilter
    },
    filterByMultipleOptions: [],
    searchOptions: {
      search: filters.search,
      placeholderText: '',
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useQuestionFilter;
