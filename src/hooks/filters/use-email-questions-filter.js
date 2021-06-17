import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilters,
  setFilter
} from '../../redux/email-questions/email-questions.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import { showQuestionOptions, showFilterObj } from '../../utils/questions';

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
  console.log('aasdasd', filters.filters);
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
    filterByMultipleOptions: [
      {
        filters: filters.filters,
        label: buttonTitles.USER_STATUS_TITLE,
        selectItems: showFilterObj(),
        setFilterHandler: setFiltersFilter,
        objForTranslateRenderItems: showQuestionOptions
      }
    ],
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
