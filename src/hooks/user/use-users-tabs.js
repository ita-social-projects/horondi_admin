import { useDispatch, useSelector } from 'react-redux';
import { setTab } from '../../redux/users/users.actions';
import { config } from '../../configs';
import useUsersFiltering from './use-users-filtering';

const { userRoles } = config;
const [user, ...other] = userRoles.map((item) => item.role);

const useUsersTabs = () => {
  const dispatch = useDispatch();
  const { tab } = useSelector(({ Users }) => ({
    tab: Users.tab
  }));
  const { setRolesFilter, clearAllFilters } = useUsersFiltering();

  const handleTabChange = (currentTab) => {
    dispatch(setTab(currentTab));
    clearAllFilters();
    setRolesFilter(currentTab ? [...other] : [user]);
  };

  return {
    tab,
    handleTabChange
  };
};

export default useUsersTabs;
