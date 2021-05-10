import {useDispatch, useSelector} from 'react-redux';
import {
  clearFilters,
  setFilter,
  setSort, setUserSortLabel
} from '../../redux/users/users.actions';
import { setCurrentPage } from '../../redux/table/table.actions';
import {sortDirection} from "../../configs/sort";
import filterLabels from "../../configs/filter-labels";
import buttonTitles from "../../configs/button-titles";
import {selectUsersAndTable} from "../../redux/selectors/users.selectors";
import {userStatus, userStatusFilterObj} from "../../utils/user";

const useUsersFilters = () => {
  const dispatch = useDispatch();
  const {
    filter,
    sortLabel
  } = useSelector(selectUsersAndTable);

  const setRolesFilter = (roles) => {
    dispatch(
      setFilter({
        roles
      })
    );
  };

  const setStatusFilter = (statuses) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setFilter({
        banned: statuses.map((item) => !!item)
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

  const setSorting = ({key, type, value}) => {
    dispatch(setCurrentPage(0));
    dispatch(
        setSort({
          [key]: sortDirection[type]
        })
    );
    dispatch(setUserSortLabel(value))
  };

  return {
    sortOptions: {
      labels: filterLabels.orders.users,
      setSorting,
      sortLabel
    },
    filterByMultipleOptions: [
      {
        filters: filter.banned,
        label: buttonTitles.USER_STATUS_TITLE,
        selectItems: userStatusFilterObj(),
        setFilterHandler: setStatusFilter,
        objForTranslateRenderItems: userStatus
      },
    ],
    setRolesFilter,
    searchOptions: {
      search: filter.search,
      setSearchFilter
    },
    clearOptions: {
      filter,
      clearAllFilters
    }
  };

};

export default useUsersFilters;
