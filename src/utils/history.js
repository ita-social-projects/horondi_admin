import moment from 'moment';
import _ from 'lodash';

import { config } from '../configs';

export const placeholderText = 'за іменем';
export const userRolesForFilter = {
  user: 'Юзер',
  admin: 'Адмін',
  superadmin: 'Суперадмін'
};

export const handleHistory = (items, titles, NO_HISTORY_RECORDS_MESSAGE) =>
  items ? titles : [NO_HISTORY_RECORDS_MESSAGE];

export const roleFilterObject = config.userRoles.map(({ role, label }) => ({
  value: role,
  label
}));

export const historyEventFilterObj = (historyEvents) => {
  const arrToFilter = [];

  _.forEach(historyEvents, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });

  return arrToFilter;
};

export const filterInputToRender = (selectedValues, valueToRender) =>
  selectedValues.map((selectedValue, inx, values) => {
    let selectedRenderValue;

    if (inx !== values.length - 1) {
      selectedRenderValue = `${valueToRender[selectedValue]}, `;
    } else {
      selectedRenderValue = valueToRender[selectedValue];
    }
    return selectedRenderValue;
  });

export const generateDateFormatForInputValue = (date) => {
  let [dateValue, timeValue] = moment(date)
    .format('YYYY-MM-DD, h:mm:ss')
    .split(', ');

  const time = timeValue.split(':');

  if (time[0] < 10) {
    timeValue = `0${time[0]},`
      .concat(time.slice(1, time.length))
      .split(',')
      .join(':');
  }
  return `${dateValue}T${timeValue}`;
};
