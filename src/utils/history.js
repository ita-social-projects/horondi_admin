import moment from 'moment';

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

export const roleFilterObject = config.userRoles.map(
  ({ role, label }) => ({ key: role, value: label })
);

export const actionFilterObj = () => {
  const arrToFilter = [];

  for (const key in historyActions) {
    arrToFilter.push({ key, value: historyActions[key] });
  }

  return arrToFilter;
};

export const filterInputToRender = (selectedValues, valueToRender) =>
  selectedValues.map((selectedValue, inx, values) => {
      if (inx !== values.length - 1) {
        selectedValue = `${valueToRender[selectedValue]}, `;

      } else {
        selectedValue = valueToRender[selectedValue];
      }
      return selectedValue;
    }
  );

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
