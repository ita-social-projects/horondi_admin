import { useDispatch } from 'react-redux';
import {
  clearFilters,
  setFilter,
  setSort
} from '../../redux/users/users.actions';
import { setCurrentPage } from '../../redux/table/table.actions';

const useUsersFiltering = () => {
  const dispatch = useDispatch();

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

  const setSorting = (key, type = 'asc') => {
    dispatch(setCurrentPage(0));
    dispatch(
      setSort({
        [key]: type === 'desc' ? -1 : 1
      })
    );
  };

  return {
    setSorting,
    setRolesFilter,
    setSearchFilter,
    setStatusFilter,
    clearAllFilters
  };
};

export default useUsersFiltering;
