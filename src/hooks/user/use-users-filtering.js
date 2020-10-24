import { useDispatch } from 'react-redux';
import { setFilter, setSort } from '../../redux/users/users.actions';

const useUsersFiltering = () => {
  const dispatch = useDispatch();

  const setRolesFilter = (roles) => {
    dispatch(setFilter({
      roles
    }));
  };

  const setStatusFilter = (statuses) => {
    dispatch(setFilter({
      banned: statuses.map((item) => !!item)
    }));
  };

  const setSearchFilter = (search) => {
    dispatch(setFilter({
      search
    }));
  };

  const setSorting = (key,type = 'asc') => {
    dispatch(setSort({
      [key]: type === 'desc' ? -1 : 1
    }))
  };

  return {
    setSorting,
    setRolesFilter,
    setSearchFilter,
    setStatusFilter
  }
};

export default useUsersFiltering;
