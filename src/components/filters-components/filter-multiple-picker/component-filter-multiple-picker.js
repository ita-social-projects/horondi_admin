import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import PickerOptions from '../../filters/options-picker';
import { setCurrentPage } from '../../../redux/table/table.actions';

const ComponentFilterMultiplePicker = ({
  setFilterValue,
  value,
  options,
  label,
  selectorFunc
}) => {
  const dispatch = useDispatch();

  const setPaymentStatusFilter = (selector) => {
    dispatch(setCurrentPage(0));
    dispatch(setFilterValue(selectorFunc(selector)));
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
  setFilterValue: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  selectorFunc: PropTypes.func.isRequired
};

ComponentFilterMultiplePicker.defaultProps = {
  value: [],
  label: ''
};

export default ComponentFilterMultiplePicker;
