import { useDispatch, useSelector } from 'react-redux';
import { setTabOrdersComments } from '../../redux/users/users.actions';
// import { config } from '../../configs';
// import useUsersFilters from '../filters/use-users-filters';

// const { userRoles } = config;
// const [user, ...other] = userRoles.map((item) => item.role);

const useOrdersCommentsTabs = () => {
  const dispatch = useDispatch();
  const tab = useSelector(({ Users }) => Users.tabOrdersComments);
  // const {
  //   setRolesFilter,
  //   clearOptions: { clearAllFilters }
  // } = useUsersFilters();

  const handleTabChange = (currentTab) => {
    dispatch(setTabOrdersComments(currentTab));
    // clearAllFilters();
    // setRolesFilter(currentTab ? [...other] : [user]);
  };

  return {
    tab,
    handleTabChange
  };
};

export default useOrdersCommentsTabs;
