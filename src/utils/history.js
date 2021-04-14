import moment from 'moment';
import _ from 'lodash';

import { config } from '../configs';
import { historyActions } from '../consts/history-actions';

export const placeholderText = 'іменем';
export const userRolesForFilter = {
  user: 'Юзер',
  admin: 'Адмін',
  superadmin: 'Суперадмін'
};

export const handleHistory = (items, titles, NO_HISTORY_RECORDS_MESSAGE) =>
  items ? titles : [NO_HISTORY_RECORDS_MESSAGE];

export const roleFilterObject = config.userRoles.map(({ role, label }) => ({
  key: role,
  value: label
}));

export const actionFilterObj = () => {
  const arrToFilter = [];

  _.forEach(historyActions, (value, key) => {
    arrToFilter.push({ key, value });
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

export const generateDateFormatForInputValue = (date) =>
  moment(date).format('YYYY-MM-DD, h:mm:ss').split(', ').join('T');

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
};
