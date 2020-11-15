import React from 'react';
import { useSelector } from 'react-redux';
import { config } from '../../../../../../configs';
import useUsersFiltering from '../../../../../../hooks/user/use-users-filtering';
import NavFilterItem from '../nav-filter-item';

const { statuses, buttonTitles } = config;
const { USER_STATUS_TITLE } = buttonTitles;

const NavFilters = () => {
  const filters = useSelector(({ Users }) => Users.filters);
  const { setStatusFilter } = useUsersFiltering();

  const handleStatusFilterChange = ({ target }) => {
    const result = target.value.map(
      (item) => item !== statuses.USER_ACTIVE_STATUS
    );

    setStatusFilter(result);
  };

  const availableStatuses = [
    statuses.USER_ACTIVE_STATUS,
    statuses.USER_INACTIVE_STATUS
  ];

  const filterOptions = {
    status: {
      filterLabels: availableStatuses,
      filterValues: filters.banned.map((item) =>
        item ? statuses.USER_INACTIVE_STATUS : statuses.USER_ACTIVE_STATUS
      ),
      filterList: availableStatuses,
      filterHandler: (e) => handleStatusFilterChange(e),
      buttonName: USER_STATUS_TITLE
    }
  };

  return Object.values(
    filterOptions
  ).map(
    ({ filterList, filterLabels, filterValues, filterHandler, buttonName }) => (
      <NavFilterItem
        filterList={filterList}
        buttonName={buttonName}
        filterValues={filterValues}
        filterHandler={filterHandler}
        filterLabels={filterLabels}
        key={buttonName}
      />
    )
  );
};

export default NavFilters;
