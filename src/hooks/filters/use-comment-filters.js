import { useDispatch, useSelector } from 'react-redux';
import { sortDirection } from '../../configs/sort';
import {
  clearFilters,
  setFilter,
  setSort,
  setSortLabel
} from '../../redux/comments/comments.actions';
import filterLabels from '../../configs/filter-labels';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import {
  placeholderCommentSearch,
  showCommentOptions,
  showFilterObj
} from '../../utils/comment';

const useCommentFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ Comments }) => Comments.filters);
  const sortLabel = useSelector(({ Comments }) => Comments.sortLabel);

  const setCommentDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        dateFrom: date[0],
        dateTo: date[1]
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

  const setSorting = ({ key, type, value }) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setSort({
        [key]: sortDirection[type]
      })
    );
    dispatch(setSortLabel(value));
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFilters());
  };

  return {
    sortOptions: {
      labels: filterLabels.comments.sortLabels,
      setSorting,
      sortLabel
    },
    filterByDateOptions: {
      dateHandler: setCommentDateRangeFilter,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo
    },
    filterByMultipleOptions: [
      {
        filters: filters.show,
        label: buttonTitles.USER_STATUS_TITLE,
        selectItems: showFilterObj(),
        setFilterHandler: setShowFilter,
        objForTranslateRenderItems: showCommentOptions
      }
    ],
    searchOptions: {
      search: filters.search,
      placeholderText: placeholderCommentSearch,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useCommentFilters;
