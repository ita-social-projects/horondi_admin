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
  const selctedFilters = useSelector(
    ({ EmailQuestions }) => EmailQuestions.filters
  );

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
      dateFrom: selctedFilters.dateFrom,
      dateTo: selctedFilters.dateTo,
      dateHandler: setCommentDateRangeFilter
    },
    filterByStatus: {
      filters: selctedFilters.filters,
      setFiltersFilter
    },
    filterByMultipleOptions: [
      {
        filters: selctedFilters.filters,
        label: buttonTitles.USER_STATUS_TITLE,
        selectItems: showFilterObj(),
        setFilterHandler: setFiltersFilter,
        objForTranslateRenderItems: showQuestionOptions
      }
    ],
    searchOptions: {
      search: selctedFilters.search,
      placeholderText: '',
      setSearchFilter
    },
    clearOptions: {
      filters: selctedFilters,
      clearAllFilters
    }
  };
};

export default useQuestionFilter;
