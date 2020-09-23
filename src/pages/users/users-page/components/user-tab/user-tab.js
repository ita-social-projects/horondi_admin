import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import TableContainerGenerator from '../../../../../containers/table-container-generator';
import TableContainerRow from '../../../../../containers/table-container-row';
import { userRoleTranslations } from '../../../../../translations/user.translations';
import { formatPhoneNumber } from '../../../../../utils/format-phone-number';
import { config } from '../../../../../configs';

const tableHeaders = config.tableHeadRowTitles.users.userTab;

const UserTab = (props) => {
  const { list, onDelete } = props;
  const dispatch = useDispatch();

  const usersItems = list.map((userItem, index) => (
    <TableContainerRow
      key={index}
      id={userItem._id}
      name={`${userItem.firstName} ${userItem.lastName}`}
      mobile={formatPhoneNumber(userItem.phoneNumber)}
      email={userItem.email}
      role={userRoleTranslations[userItem.role]}
      banned={userItem.banned ? 'Неактивний' : 'Активний'}
      deleteHandler={() => onDelete(userItem._id)}
      editHandler={() => dispatch(push(`/users/${userItem._id}`))}
    />
  ));

  return (
    <>
      <TableContainerGenerator
        id='usersTable'
        tableTitles={tableHeaders}
        tableItems={usersItems}
      />
    </>
  );
};

UserTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserTab;
