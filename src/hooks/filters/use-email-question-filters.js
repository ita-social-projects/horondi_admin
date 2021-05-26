import { useDispatch, useSelector } from 'react-redux';

import {
  clearFilters,
  setFilter
} from '../../redux/email-questions/email-questions.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import titles from '../../configs/titles';
import buttonTitles from '../../configs/button-titles';
import {
  placeholderEmailQuestionSearch,
  showEmailQuestionStatusOptions,
  showFilterObj
} from '../../utils/email-question-list';

const useEmailQuestionFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ EmailQuestions }) => EmailQuestions.filters);

  const setEmailQuestionDateFromRangeFilter = (dateFrom) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        dateFrom
      })
    );
  };

  const setEmailQuestionDateToRangeFilter = (dateTo) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        dateTo
      })
    );
  };
  const setShowFilter = (show) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        show
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
    filterByDateOptions: [
      {
        title: titles.historyTitles.from,
        dateHandler: setEmailQuestionDateFromRangeFilter,
        filters: filters.dateFrom
      },
      {
        title: titles.historyTitles.to,
        dateHandler: setEmailQuestionDateToRangeFilter,
        filters: filters.dateTo
      }
    ],
    filterByMultipleOptions: [
      {
        filters: filters.show,
        label: buttonTitles.USER_STATUS_TITLE,
        selectItems: showFilterObj(),
        setFilterHandler: setShowFilter,
        objForTranslateRenderItems: showEmailQuestionStatusOptions
      }
    ],
    searchOptions: {
      search: filters.search,
      placeholderText: placeholderEmailQuestionSearch,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useEmailQuestionFilters;
