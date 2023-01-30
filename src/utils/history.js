import _ from 'lodash';

export const userRolesForFilter = {
  user: 'Юзер',
  admin: 'Адмін',
  superadmin: 'Суперадмін'
};

export const handleHistory = (items, titles, NO_HISTORY_RECORDS_MESSAGE) =>
  items ? titles : [NO_HISTORY_RECORDS_MESSAGE];

export const historyEventFilterObj = (historyEvents) => {
  const arrToFilter = [];

  _.forEach(historyEvents, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });

  return arrToFilter;
};
