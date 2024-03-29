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
import UsersFilters from '../users-filters/UsersFilters';
import { useCommonStyles } from '../../../common.styles';
import { usersErrors } from '../../../../configs/error-modal-messages';

const map = require('lodash/map');

const { USER_ACTIVE_STATUS, USER_INACTIVE_STATUS } = config.statuses;
const tableTitles = config.tableHeadRowTitles.users.userTab;
const { unknownUser } = config.labels.user;
const { IMG_URL } = config;
const { USER_NOT_FOUND } = usersErrors;

const UserTab = (props) => {
  const { list, onDelete } = props;
  const { userLoading, itemsCount } = useSelector(selectUserLoadAndItemsCount);
  const dispatch = useDispatch();
  const tabStyles = useStyles();
  const commonStyles = useCommonStyles();

  const usersItems = map(list, (userItem) => (
    <TableContainerRow
      key={userItem._id}
      id={userItem._id}
      name={
        userItem.firstName || userItem.lastName
          ? `${userItem.firstName || ''} ${userItem.lastName || ''}`
          : unknownUser
      }
      mobile={formatPhoneNumber(userItem.phoneNumber) || '-'}
      email={userItem.email || ''}
      image={IMG_URL + userItem.images?.thumbnail}
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
        <UsersFilters />
      </div>
      <div>
        {list?.length ? (
          <TableContainerGenerator
            pagination
            count={itemsCount}
            id='usersTable'
            tableTitles={tableTitles}
            tableItems={usersItems}
          />
        ) : (
          <p className={commonStyles.noRecords}>{USER_NOT_FOUND}</p>
        )}
      </div>
    </>
  );
};

UserTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserTab;
