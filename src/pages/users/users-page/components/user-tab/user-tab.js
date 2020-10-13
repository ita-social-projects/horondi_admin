import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import TableContainerGenerator from '../../../../../containers/table-container-generator';
import TableContainerRow from '../../../../../containers/table-container-row';
import { userRoleTranslations } from '../../../../../translations/user.translations';
import { formatPhoneNumber } from '../../../../../utils/format-phone-number';
import { statuses, tableHeadRowTitles } from '../../../../../configs';

const { USER_ACTIVE_STATUS, USER_INACTIVE_STATUS } = statuses;
const tableTitles = tableHeadRowTitles.users.userTab;

const UserTab = (props) => {
  const { list, onDelete } = props;
  const dispatch = useDispatch();

  const usersItems = list.map((userItem) => (
    <TableContainerRow
      key={userItem._id}
      id={userItem._id}
      name={`${userItem.firstName} ${userItem.lastName}`}
      mobile={formatPhoneNumber(userItem.phoneNumber)}
      email={userItem.email}
      role={userRoleTranslations[userItem.role]}
      banned={userItem.banned ? USER_INACTIVE_STATUS : USER_ACTIVE_STATUS}
      deleteHandler={() => onDelete(userItem._id)}
      editHandler={() => dispatch(push(`/users/${userItem._id}`))}
    />
  ));

  return (
    <TableContainerGenerator
      id='usersTable'
      tableTitles={tableTitles}
      tableItems={usersItems}
    />
  );
};

UserTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserTab;
