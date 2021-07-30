import { useDispatch, useSelector } from 'react-redux';
import {
  clearFiltersUser,
  setFilterUser
} from '../../redux/comments/comments.actions';
import filterLabels from '../../configs/filter-labels';
import { setCurrentPage } from '../../redux/table/table.actions';
import buttonTitles from '../../configs/button-titles';
import comments from '../../configs/comments';
import {
  placeholderCommentSearch,
  showCommentOptions,
  showFilterObj,
  showCommentTypes
} from '../../utils/comment';
import useCommentFilters from './use-comment-filters';

const useCommentUserFilters = () => {
  const dispatch = useDispatch();
  const { filtersUser: filters, sortLabel } = useSelector(
    ({ Comments }) => Comments
  );

  const {
    sortOptions: { setSorting }
  } = useCommentFilters();

  const setCommentDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterUser({
        dateFrom: date[0],
        dateTo: date[1]
      })
    );
  };

  const setShowFilter = (show) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterUser({
        show
      })
    );
  };

  const setTypeCommentFilter = (type) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterUser({
        typeComment: type
      })
    );
  };

  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilterUser({
        search
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearFiltersUser());
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
      },
      {
        filters: filters.typeComment,
        label: buttonTitles.COMMENT_TYPE,
        selectItems: showCommentTypes(),
        setFilterHandler: setTypeCommentFilter,
        objForTranslateRenderItems: comments.commentType
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

export default useCommentUserFilters;
