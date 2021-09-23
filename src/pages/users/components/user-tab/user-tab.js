import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import TableContainerRow from '../../../../containers/table-container-row';
import { userRoleTranslations } from '../../../../configs/user-role-translations';
import { formatPhoneNumber } from '../../../../utils/format-phone-number';
import { config } from '../../../../configs';
import { useStyles } from './user-tab.styles';
import LoadingBar from '../../../../components/loading-bar';
import { selectUserLoadAndItemsCount } from '../../../../redux/selectors/users.selectors';
import { UserBlockPeriod } from '../../../../consts/user-block-status';
import useUsersFilters from '../../../../hooks/filters/use-users-filters';
import FilterNavbar from '../../../../components/filter-search-sort';

const map = require('lodash/map');

const { USER_ACTIVE_STATUS, USER_INACTIVE_STATUS } = config.statuses;
const tableTitles = config.tableHeadRowTitles.users.userTab;
const { unknownUser } = config.labels.user;

const UserTab = (props) => {
  const { list, onDelete } = props;
  const { userLoading, itemsCount } = useSelector(selectUserLoadAndItemsCount);
  const dispatch = useDispatch();
  const usersFilters = useUsersFilters();
  const tabStyles = useStyles();

  const usersItems = map(list, (userItem) => (
    <TableContainerRow
      key={userItem._id}
      id={userItem._id}
      name={
        userItem.firstName || userItem.lastName
          ? `${userItem.firstName || ''} ${userItem.lastName || ''}`
          : unknownUser
      }
      mobile={formatPhoneNumber(userItem.phoneNumber) || ''}
      email={userItem.email || ''}
      role={userRoleTranslations[userItem.role]}
      banned={
        userItem.banned.blockPeriod === UserBlockPeriod.UNLOCKED
          ? USER_ACTIVE_STATUS
          : USER_INACTIVE_STATUS
      }
      deleteHandler={() => onDelete(userItem._id)}
      editHandler={() => dispatch(push(`/users/${userItem._id}`))}
    />
  ));

  if (userLoading) {
    return <LoadingBar />;
  }

  return (
    <>
      <div className={tabStyles.filters}>
        <FilterNavbar options={usersFilters || {}} />
      </div>
      <div>
        <TableContainerGenerator
          pagination
          count={itemsCount}
          id='usersTable'
          tableTitles={tableTitles}
          tableItems={usersItems}
        />
      </div>
    </>
  );
};

UserTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserTab;
