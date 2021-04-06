import _ from 'lodash';

export const checkInitialValue = (initialValue, currentValue) => _.isEqual(initialValue, currentValue);
