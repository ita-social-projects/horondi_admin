import { useDispatch, useSelector } from 'react-redux';
import { setTab } from '../../redux/users/users.actions';
import { config } from '../../configs';
import useUsersFiltering from './use-users-filtering';

const { userRoles } = config;
const [user, ...other] = userRoles.map((item) => item.role);

const useUsersTabs = () => {
  const dispatch = useDispatch();
  const {tab} = useSelector(({Users}) => ({
    tab: Users.tab
  }));
  const {setRolesFilter} = useUsersFiltering();

  const handleTabChange = (tab) => {
    dispatch(setTab(tab));
    setRolesFilter(tab ? [...other] : [user]);
  };

  return {
    tab,
    handleTabChange
  }
};

export default useUsersTabs;
