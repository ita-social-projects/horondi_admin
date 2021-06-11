import { useDispatch, useSelector } from 'react-redux';

import {
  setHistoryFilter,
  clearHistoryFilters
} from '../../redux/history/history.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import {
  actionFilterObj,
  placeholderText,
  roleFilterObject,
  userRolesForFilter
} from '../../utils/history';
import buttonTitles from '../../configs/button-titles';
import { historyActions } from '../../consts/history-actions';

const useHistoryFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({ History }) => History.filters);

  const setDateRangeFilter = (date) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setHistoryFilter({
        dateFrom: date[0],
        dateTo: date[1]
      })
    );
  };

  const setSearchFilter = (fullName) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setHistoryFilter({
        search: fullName
      })
    );
  };

  const setActionsFilter = (action) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setHistoryFilter({
        action
      })
    );
  };

  const setRolesFilter = (role) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setHistoryFilter({
        role
      })
    );
  };

  const clearAllFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(clearHistoryFilters());
  };

  return {
    filterByDateOptions: {
      dateHandler: setDateRangeFilter,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo
    },

    filterByMultipleOptions: [
      {
        filters: filters.action,
        label: buttonTitles.EVENT_TITLE,
        selectItems: actionFilterObj(),
        setFilterHandler: setActionsFilter,
        objForTranslateRenderItems: historyActions
      },
      {
        filters: filters.role,
        label: buttonTitles.USER_ROLE_TITLE,
        selectItems: roleFilterObject,
        setFilterHandler: setRolesFilter,
        objForTranslateRenderItems: userRolesForFilter
      }
    ],
    searchOptions: {
      search: filters.search,
      placeholderText,
      setSearchFilter
    },
    clearOptions: {
      filters,
      clearAllFilters
    }
  };
};

export default useHistoryFilters;
