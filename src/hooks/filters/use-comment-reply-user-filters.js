import { useDispatch, useSelector } from 'react-redux';
import {
  clearFiltersReplyUser,
  setFilterReplyUser,
  setReplySort,
  setReplySortLabel
} from '../../redux/comments/comments.actions';
import filterLabels from '../../configs/filter-labels';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import {
  placeholderCommentSearch,
  showCommentOptions,
  showFilterObj
} from '../../utils/comment';
import useCommentUserFilters from './use-comment-user-filters';
import { sortDirection } from '../../configs/sort';

const useCommentReplyUserFilters = () => {
  const dispatch = useDispatch();
  const { filtersReplyUser: filters, replySortLabel: sortLabel } = useSelector(
    ({ Comments }) => Comments
  );

  const { pickerOptions } = useCommentUserFilters();

  const setSorting = ({ key, type, value }) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setReplySort({
        [key]: sortDirection[type]
      })
    );
    dispatch(setReplySortLabel(value));
  };

  const setCommentDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterReplyUser({
        dateFrom: date[0],
        dateTo: date[1]
      })
    );
  };

  const setShowFilter = (show) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterReplyUser({
        show
      })
    );
  };

  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterReplyUser({
        search
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFiltersReplyUser());
  };

  return {
    pickerOptions,
    sortOptions: {
      labels: filterLabels.reply.sortLabels,
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

export default useCommentReplyUserFilters;
