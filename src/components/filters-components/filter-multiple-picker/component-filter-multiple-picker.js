import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import PickerOptions from '../../filters/options-picker';

const ComponentFilterMultiplePicker = ({
  actionSetCurrentPage,
  actionSetMultipleFilter,
  value,
  options,
  label,
  selectorFunc
}) => {
  const dispatch = useDispatch();

  const setPaymentStatusFilter = (selector) => {
    dispatch(actionSetCurrentPage(0));
    dispatch(actionSetMultipleFilter(selectorFunc(selector)));
  };

  return (
    <PickerOptions
      value={value}
      handler={setPaymentStatusFilter}
      label={label}
      options={options}
    />
  );
};

ComponentFilterMultiplePicker.propTypes = {
  actionSetCurrentPage: PropTypes.func.isRequired,
  actionSetMultipleFilter: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  selectorFunc: PropTypes.func.isRequired
};

ComponentFilterMultiplePicker.defaultProps = {
  value: '',
  label: ''
};

export default ComponentFilterMultiplePicker;
