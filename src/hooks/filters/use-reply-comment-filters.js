import { useDispatch, useSelector } from 'react-redux';
import { sortDirection } from '../../configs/sort';
import {
  setReplyFilter,
  setReplySort,
  setReplySortLabel,
  clearReplyFilters
} from '../../redux/comments/comments.actions';
import filterLabels from '../../configs/filter-labels';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import {
  placeholderCommentSearch,
  showCommentOptions,
  showFilterObj
} from '../../utils/comment';

const useReplyCommentFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ Comments }) => Comments.replyFilters);
  const sortLabel = useSelector(({ Comments }) => Comments.replySortLabel);

  const setCommentDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setReplyFilter({
        dateFrom: date[0],
        dateTo: date[1]
      })
    );
  };

  const setShowFilter = (show) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setReplyFilter({
        show
      })
    );
  };
  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setReplyFilter({
        search
      })
    );
  };

  const setSorting = ({ key, type, value }) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setReplySort({
        [key]: sortDirection[type]
      })
    );
    dispatch(setReplySortLabel(value));
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearReplyFilters());
  };

  return {
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

export default useReplyCommentFilters;
